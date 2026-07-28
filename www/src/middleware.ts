import { defineMiddleware, sequence } from "astro:middleware";
import { assertIsLocale, baseLocale, setLocale } from "@paraglide/runtime";
import { paraglideMiddleware } from "@paraglide/server";

const paraglidei18nMiddleware = defineMiddleware(async (context, next) => {
	if (context.isPrerendered) {
		setLocale(assertIsLocale(context.currentLocale ?? baseLocale));

		return next();
	}

	return paraglideMiddleware(context.request, ({ request }) => next(request));
});

export const onRequest = sequence(paraglidei18nMiddleware);
