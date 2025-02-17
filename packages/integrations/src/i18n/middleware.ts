import { middleware } from "astro/virtual-modules/i18n.js";
import { sequence } from "astro/virtual-modules/middleware.js";
import { AsyncLocalStorage } from "node:async_hooks";
import type { MiddlewareHandler } from "astro";
import { type AllowedLocales, defaultLocale } from "./config.js";
import { defineGetLocale, defineSetLocale } from "./paraglide/runtime.js";

const asyncStorage = new AsyncLocalStorage<AllowedLocales>();
defineGetLocale(() => asyncStorage.getStore() ?? defaultLocale);

// do nothing on the server
defineSetLocale(() => {});

const paraglideMiddleware: MiddlewareHandler = async (context, next) => {
	const locale = (context.currentLocale as AllowedLocales | undefined) ?? defaultLocale;
	return await asyncStorage.run(locale, next);
};

export const onRequest = sequence(paraglideMiddleware);
