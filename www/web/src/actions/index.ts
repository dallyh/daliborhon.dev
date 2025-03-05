import { ActionError, defineAction } from "astro:actions";
import { PageView, db } from "astro:db";
import { z } from "astro:schema";
import { Logger } from "@logger";
import { isbot } from "isbot";
import type { Locale } from "@paraglide/runtime";
import { CONTACT_FORM_ACCESS_KEY } from "astro:env/server";

const logger = new Logger("actions\\index.ts");

const pageViewAction = defineAction({
	input: z.object({
		url: z.string(),
	}),
	handler: async ({ url }, context) => {
		const { request } = context;

		if (isbot(request.headers.get("user-agent"))) {
			throw new ActionError({
				code: "FORBIDDEN",
				message: "This endpoint is not available for bots",
			});
		}

		if (!url) {
			throw new ActionError({
				code: "BAD_REQUEST",
				message: "Missing URL",
			});
		}

		if (url.includes("/analytics")) {
			throw new ActionError({
				code: "BAD_REQUEST",
				message: "This url is not tracked",
			});
		}

		try {
			const id = await db.insert(PageView).values([
				{
					url: url,
					date: new Date(),
				},
			]);
			logger.info(`Inserted page view for: ${url} with id: ${id.lastInsertRowid}`);
			return {};
		} catch (e) {
			logger.error((e as Error).message);
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error updating views",
			});
		}
	},
});

const contactFormAction = defineAction({
	input: z.object({
		subject: z.string(),
		from_name: z.string(),
		botcheck: z.boolean(),
		name: z.string(),
		email: z.string(),
		message: z.string(),
		language: z.custom<Locale>(),
		"h-captcha-response": z.string(),
	}),
	handler: async (input) => {
		const API_URL = "https://api.web3forms.com/submit";
		const data = {
			...input,
			access_key: CONTACT_FORM_ACCESS_KEY,
		};

		let response;
		try {
			response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(data),
			});
		} catch (err) {
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Network error: ${(err as Error).message}`,
			});
		}

		let json;
		try {
			json = await response.json();
		} catch {
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Failed to parse JSON response",
			});
		}

		if (!response.ok) {
			const errorMessage = json?.message || "Unknown error";
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Invalid response: ${response.status} ${response.statusText} - ${errorMessage}`,
			});
		}

		if (json.success === false) {
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: `Invalid response: ${JSON.stringify(json)}`,
			});
		}

		return {};
	},
});

export const server = {
	pageView: pageViewAction,
	contactForm: contactFormAction,
};
