import { CONTACT_FORM_ACCESS_KEY } from "astro:env/server";
import * as m from "@daliborhon.dev/integrations/i18n/messages";
import type { AllowedLocales } from "@daliborhon.dev/integrations/i18n";
import type { APIRoute } from "astro";

export const prerender = false;

const API_URL = "https://api.web3forms.com/submit";

export interface FormData {
	access_key: string;
	subject: string;
	from_name: string;
	botcheck: boolean;
	name: string;
	email: string;
	message: string;
	language: AllowedLocales;
	"h-captcha-response": string;
}

export const POST: APIRoute = async ({ request }) => {
	let data = (await request.json()) as FormData;
	data.access_key = CONTACT_FORM_ACCESS_KEY;

	if (request.headers.get("Content-Type") !== "application/json") {
		return new Response(JSON.stringify({ error: "INVALID_CONTENT", message: "Invalid content type" }), { status: 400 });
	}

	const res = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify(data),
	})
		.then(async (res) => {
			let json = await res.json();

			if (json.success && json.success === true) {
				return json;
			} else {
				return {
					error: "ERROR_RESPONSE",
					message: m.contact__submit_error_formatted({ message: json.message }),
				};
			}
		})
		.catch((error) => {
			console.error(error);

			return {
				error: "UNEXPECTED_ERROR",
				message: m.contact__submit_error(),
			};
		});

	return new Response(JSON.stringify(res), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
