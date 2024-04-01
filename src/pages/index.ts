import type { APIRoute, AstroCookieSetOptions } from "astro";
import { defaultLocale, locales } from "@i18n/config";
import { getRelativeLocaleUrl } from "astro:i18n";
import { siteConfig } from "@config";

export const prerender = false;

function addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const configCookie = siteConfig.i18n.localeCookie;

export const GET: APIRoute = ({ preferredLocale, redirect, cookies }) => {
    const localeCookie = cookies.get(configCookie.name);

    if (localeCookie) {
        return redirect(getRelativeLocaleUrl(localeCookie.value, "/home"));
    }

    const localeSupported = locales.find((locale) => {
        return locale === preferredLocale;
    });

    const cookieOptions: AstroCookieSetOptions = { expires: addDays(new Date(), configCookie.expDays) };

    if (localeSupported) {
        if (preferredLocale === defaultLocale) {
            cookies.set(configCookie.name, defaultLocale, cookieOptions);
            return redirect(getRelativeLocaleUrl(defaultLocale, "/home"));
        }

        cookies.set(configCookie.name, preferredLocale!, cookieOptions);
        return redirect(getRelativeLocaleUrl(preferredLocale!, "/home"));
    }

    cookies.set(configCookie.name, defaultLocale, cookieOptions);
    return redirect(getRelativeLocaleUrl(defaultLocale, "/home"));
};
