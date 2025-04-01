import { envField } from "astro/config";

export default {
	OA_GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: false }),
	OA_GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: false }),
	OA_ALLOWED_DOMAINS: envField.string({ context: "server", access: "secret", optional: true }),
	GITHUB_API_AUTH_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
	HCAPTCHA_KEY: envField.string({ context: "client", access: "public", default: "50b2fe65-b00b-4b9e-ad62-3ba471098be2" }),
	CONTACT_FORM_ACCESS_KEY: envField.string({ context: "server", access: "public", default: "7d81d4b3-a54e-4341-9544-2553a5aa4daf" }),
	PREVIEW: envField.boolean({ context: "client", access: "public", default: false }),
	APP_VERSION_NAME: envField.string({ context: "client", access: "public", optional: true }),
	UPTIME_API_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
};
