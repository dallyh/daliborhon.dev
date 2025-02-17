import { defineMiddleware, sequence } from "astro:middleware";

const dummy = defineMiddleware(async (context, next) => {
	return await next();
});

export const onRequest = sequence(dummy);
