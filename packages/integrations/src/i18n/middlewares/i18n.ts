import { middleware } from "astro/virtual-modules/i18n.js";

export const onRequest = middleware({
	prefixDefaultLocale: true,
	redirectToDefaultLocale: false,
	fallbackType: "redirect",
});
