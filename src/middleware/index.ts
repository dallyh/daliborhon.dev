import { middleware } from "astro:i18n";
import { defineMiddleware, sequence } from "astro:middleware";

export const cmsMiddleware = defineMiddleware(async (context, next) => {
	const response = await next();
	
	if (context.url.pathname === "/cms") {
		return new Response(response.body, {
			status: 200,
			headers: response.headers
		});
	} else {
		return response;
	}
});

export const onRequest = sequence(
	cmsMiddleware,
	middleware({
		prefixDefaultLocale: true,
		redirectToDefaultLocale: false,
		fallbackType: "redirect"
	}),
);
