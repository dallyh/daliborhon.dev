import { AsyncLocalStorage } from "node:async_hooks";
import type { MiddlewareHandler } from "astro";
import { Logger } from "../../logger.js";
import { type AllowedLocales, defaultLocale } from "../config.js";
import { defineGetLocale, defineSetLocale } from "../paraglide/runtime.js";

var logger = new Logger("paraglide-middleware");

const asyncStorage = new AsyncLocalStorage<AllowedLocales>();
defineGetLocale(() => asyncStorage.getStore() ?? defaultLocale);

// do nothing on the server
defineSetLocale(() => {});

export const onRequest: MiddlewareHandler = async (context, next) => {
	const locale = (context.currentLocale as AllowedLocales | undefined) ?? defaultLocale;
	logger.debug("paraglideMiddleware: found locale: " + locale);
	return await asyncStorage.run(locale, next);
};
