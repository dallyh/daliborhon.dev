import { envField } from "astro/config";

const coolifyEnv = {
	// Generated by Coolify
	COOLIFY_BRANCH: envField.string({ context: "client", access: "public", optional: true }),
	SOURCE_COMMIT: envField.string({ context: "client", access: "public", optional: true }),
};

const umamiEnv = {
	UMAMI_URL: envField.string({ context: "client", access: "public", optional: false, default: "https://analytics.daliborhon.dev" }),
	UMAMI_SITE_ID: envField.string({ context: "client", access: "public", optional: false, default: "7e04370d-ecba-4fd8-8d71-2d50880d0d59" }),
	UMAMI_USERNAME: envField.string({ context: "server", access: "secret", optional: false }),
	UMAMI_PASSWORD: envField.string({ context: "server", access: "secret", optional: false }),
};

export default {
	SITE: envField.string({ context: "client", access: "public", optional: false, default: "https://daliborhon.dev" }),
	OA_GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: false }),
	OA_GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: false }),
	OA_ALLOWED_DOMAINS: envField.string({ context: "server", access: "secret", optional: true }),
	GITHUB_API_AUTH_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
	HCAPTCHA_KEY: envField.string({ context: "client", access: "public", default: "50b2fe65-b00b-4b9e-ad62-3ba471098be2" }),
	CONTACT_FORM_ACCESS_KEY: envField.string({ context: "server", access: "public", default: "7d81d4b3-a54e-4341-9544-2553a5aa4daf" }),
	PREVIEW: envField.boolean({ context: "client", access: "public", default: false }),
	UPTIME_API_TOKEN: envField.string({ context: "server", access: "secret", optional: false }),
	...umamiEnv,
	...coolifyEnv,
};
