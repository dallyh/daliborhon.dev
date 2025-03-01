import { getRelativeLocaleUrl } from "astro:i18n";
import { baseLocale, cookieName, locales } from "@paraglide/runtime";
import type { APIRoute, AstroCookieSetOptions } from "astro";

export const prerender = false;

function addDays(date: Date, days: number) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

const configCookie = cookieName;

export const GET: APIRoute = ({ preferredLocale, redirect, cookies }) => {
	const localeCookie = cookies.get(configCookie);

	if (localeCookie) {
		return redirect(getRelativeLocaleUrl(localeCookie.value, "/"));
	}

	const localeSupported = locales.find((locale) => {
		return locale === preferredLocale;
	});

	const cookieOptions: AstroCookieSetOptions = { expires: addDays(new Date(), 30) };

	if (localeSupported) {
		if (preferredLocale === baseLocale) {
			cookies.set(configCookie, baseLocale, cookieOptions);
			return redirect(getRelativeLocaleUrl(baseLocale, "/"));
		}

		cookies.set(configCookie, preferredLocale!, cookieOptions);
		return redirect(getRelativeLocaleUrl(preferredLocale!, "/"));
	}

	cookies.set(configCookie, baseLocale, cookieOptions);
	return redirect(getRelativeLocaleUrl(baseLocale, "/"));
};
