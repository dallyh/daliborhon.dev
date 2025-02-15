import { defineMiddleware, sequence } from "astro:middleware";

const cmsMiddleware = defineMiddleware(async (context, next) => {
	const response = await next();

	if (context.url.pathname === "/cms" || context.url.pathname === "/cms/") {
		return new Response(response.body, {
			status: 200,
			headers: response.headers,
		});
	} else {
		return response;
	}
});

export const onRequest = sequence(cmsMiddleware);
