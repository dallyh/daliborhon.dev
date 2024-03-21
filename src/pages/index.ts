import type { APIRoute } from "astro";
import { defaultLocale, locales } from "@i18n/config";
import { getRelativeLocaleUrl } from "astro:i18n";


export const prerender = false;

export const GET: APIRoute = ({ preferredLocale, redirect }) => {
    const localeSupported = locales.find((locale) => {
        return locale === preferredLocale;
    });

    if (localeSupported) {
        if (preferredLocale === defaultLocale) {
            return redirect(getRelativeLocaleUrl(defaultLocale, "/home"));
        }

        return redirect(getRelativeLocaleUrl(preferredLocale!, "/home"));
    }

    return redirect(getRelativeLocaleUrl(defaultLocale, "/home"));
};
