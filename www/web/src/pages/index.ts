import { getRelativeLocaleUrl } from "astro:i18n";
import { baseLocale, cookieName, locales } from "@paraglide/runtime";
import type { APIRoute, AstroCookieSetOptions } from "astro";

export const prerender = false;

function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export const GET: APIRoute = ({ preferredLocale, redirect, cookies }) => {
	const localeCookie = cookies.get(cookieName);

	if (localeCookie) {
		return redirect(getRelativeLocaleUrl(localeCookie.value, "/"));
	}

	const localeSupported = locales.find((locale) => {
		return locale === preferredLocale;
	});

	const cookieOptions: AstroCookieSetOptions = { expires: addDays(new Date(), 30) };

	if (localeSupported) {
		cookies.set(cookieName, preferredLocale!, cookieOptions);
		return redirect(getRelativeLocaleUrl(preferredLocale!, "/"));
	}

	cookies.set(cookieName, baseLocale, cookieOptions);
	return redirect(getRelativeLocaleUrl(baseLocale, "/"));
};
