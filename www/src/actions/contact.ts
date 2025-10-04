import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";
import { RESEND_API_KEY, HCAPTCHA_SECRET_KEY } from "astro:env/server";
import type { Locale } from "@paraglide/runtime";
import { Logger } from "@logger"

const logger = new Logger("contact-form");
const resend = new Resend(RESEND_API_KEY);

type HCaptchaVerifyResponse = {
	success: boolean;
	challenge_ts?: string; // ISO timestamp
	hostname?: string;
	"error-codes"?: string[];
	credit?: boolean;
	score?: number; // enterprise
	score_reason?: string[]; // enterprise
};

// Optional: tiny helper for readable errors
function badRequest(message: string) {
	throw new ActionError({ code: "BAD_REQUEST", message });
}

function internal(message: string) {
	throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message });
}

function hcaptchaUserMessage(errors?: string[]) {
	if (!errors?.length) return "Captcha check failed. Please try again.";
	// Prefer the first known code
	for (const code of errors) {
		if (HCAPTCHA_ERROR_MAP[code]) return HCAPTCHA_ERROR_MAP[code];
	}
	return "Captcha check failed. Please try again.";
}

const HCAPTCHA_ERROR_MAP: Record<string, string> = {
	"missing-input-secret": "Captcha configuration error.",
	"invalid-input-secret": "Captcha configuration error.",
	"missing-input-response": "Please complete the captcha.",
	"invalid-input-response": "Captcha token is invalid or expired. Please try again.",
	"bad-request": "Captcha request was malformed. Please try again.",
	"invalid-or-already-seen-response": "Captcha already used or expired. Please try again.",
	"not-using-dummy-passcode": "Captcha misconfiguration.",
	"sitekey-secret-mismatch": "Captcha keys mismatch.",
};

export const contactFormAction = defineAction({
	accept: "form",
	input: z.object({
		subject: z.string().min(1).max(200),
		name: z.string().min(1).max(120),
		email: z.string().email(),
		message: z.string().min(1).max(5000),
		language: z.custom<Locale>(),
		"h-captcha-response": z.string().min(1), // token from hCaptcha widget
	}),
	handler: async (input) => {
		// --- 1) Verify hCaptcha server-side ---
		let verify: HCaptchaVerifyResponse | null = null;
		try {
			const res = await fetch("https://hcaptcha.com/siteverify", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: new URLSearchParams({
					secret: HCAPTCHA_SECRET_KEY,
					response: input["h-captcha-response"],
				}),
			});
			verify = (await res.json()) as HCaptchaVerifyResponse;
		} catch (e) {
			internal(`Captcha verification failed: ${(e as Error).message}`);

		}

		// success must be true
		if (!verify?.success) {
			// Log server-side details for debugging/alerts
			const err = {
				errors: verify?.["error-codes"],
				hostname: verify?.hostname,
				ts: verify?.challenge_ts,
			}
			logger.warn(`hCaptcha failed ${JSON.stringify(err)}`, );
			badRequest(hcaptchaUserMessage(verify?.["error-codes"]));
		}

		// --- 2) Send the email with Resend ---
		const subject = `[Contact] ${input.subject}`;
		// prettier-ignore
		const text = [
			`New contact form submission`, 
			`--------------------------------`, 
			`Name: ${input.name}`, 
			`Email: ${input.email}`, 
			`Language: ${input.language}`, 
			``, 
			`Message:`, 
			input.message]
		.join("\n");

		try {
			const { error } = await resend.emails.send({
				from: "Contact <contact@notifications.daliborhon.dev>",
				to: "contact@daliborhon.dev",
				replyTo: input.email,
				subject,
				text,
				headers: { "X-Entity-Ref-ID": crypto.randomUUID() },
			});

			if (error) {
				internal(`Email send failed: ${error.message ?? String(error)}`);
			}
		} catch (err) {
			internal(`Email send failed: ${(err as Error).message}`);
		}

		return { ok: true };
	},
});
