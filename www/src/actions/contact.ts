import { ActionError, defineAction } from "astro:actions";
import { CONTACT_FORM_ACCESS_KEY } from "astro:env/server";
import { z } from "astro:schema";
import type { Locale } from "@paraglide/runtime";

export const contactFormAction = defineAction({
	accept: "form",
	input: z.object({
		subject: z.string(),
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
