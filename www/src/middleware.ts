import { AsyncLocalStorage } from "node:async_hooks";
import { sequence } from "astro:middleware";
import { defineMiddleware } from "astro:middleware";
import { type Locale, baseLocale, overwriteGetLocale, overwriteSetLocale } from "@paraglide/runtime";

const asyncStorage = new AsyncLocalStorage<Locale>();
overwriteGetLocale(() => asyncStorage.getStore() ?? baseLocale);

// do nothing on the server
overwriteSetLocale(() => {});

const paraglideMiddleware = defineMiddleware(async (context, next) => {
	const locale = (context.currentLocale as Locale | undefined) ?? baseLocale;
	return await asyncStorage.run(locale, next);
});

export const onRequest = sequence(paraglideMiddleware);
