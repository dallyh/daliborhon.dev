import type { APIRoute, AstroCookieSetOptions } from "astro";
import { defaultLocale, locales } from "@i18n/config";
import { getRelativeLocaleUrl } from "astro:i18n";

export const prerender = false;

function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const cookieName = "redirected-locale";

export const GET: APIRoute = ({ preferredLocale, redirect, cookies }) => {
    const localeCookie = cookies.get(cookieName);

    if (localeCookie) {
        return redirect(getRelativeLocaleUrl(localeCookie.value, "/home"));
    }

    const localeSupported = locales.find((locale) => {
        return locale === preferredLocale;
    });

    const cookieOptions: AstroCookieSetOptions = { expires: addDays(new Date(), 60) };

    if (localeSupported) {
        if (preferredLocale === defaultLocale) {
            cookies.set(cookieName, defaultLocale, cookieOptions);
            return redirect(getRelativeLocaleUrl(defaultLocale, "/home"));
        }

        cookies.set(cookieName, preferredLocale!, cookieOptions);
        return redirect(getRelativeLocaleUrl(preferredLocale!, "/home"));
    }

    cookies.set(cookieName, defaultLocale, cookieOptions);
    return redirect(getRelativeLocaleUrl(defaultLocale, "/home"));
};
