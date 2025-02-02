import { middleware } from "astro:i18n";
import { AsyncLocalStorage } from "node:async_hooks";
import { defineMiddleware, sequence } from "astro:middleware";
import { defineGetLocale, defineSetLocale } from "@daliborhon.dev/i18n/runtime";
import { defaultLocale, type AllowedLocales } from "@daliborhon.dev/i18n";
import { Logger } from "@daliborhon.dev/integrations";

var logger = new Logger("middleware", import.meta.env.DEV);

const asyncStorage = new AsyncLocalStorage<AllowedLocales>();
defineGetLocale(() => asyncStorage.getStore() ?? defaultLocale);

// do nothing on the server
defineSetLocale(() => {});

const paraglideMiddleware = defineMiddleware(async (context, next) => {
	const locale = (context.currentLocale as AllowedLocales | undefined) ?? defaultLocale;
	logger.debug("paraglideMiddleware: found locale: " + locale);
	return await asyncStorage.run(locale, next);
});

const cmsMiddleware = defineMiddleware(async (context, next) => {
	const response = await next();

	if (context.url.pathname === "/cms") {
		return new Response(response.body, {
			status: 200,
			headers: response.headers,
		});
	} else {
		return response;
	}
});

export const onRequest = sequence(
	paraglideMiddleware,
	cmsMiddleware,
	middleware({
		prefixDefaultLocale: true,
		redirectToDefaultLocale: false,
		fallbackType: "redirect",
	}),
);
