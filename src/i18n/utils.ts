import { locales, defaultLocale } from "./config";

export function getLocale(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (locales.includes(lang)) {
        return lang;
    }
    return defaultLocale;
}

export function getRoutingLocale(locale: string | undefined) {
    if (locale === defaultLocale) {
        return undefined;
    }

    return locale;
}

export function getDefaultLocale(locale: string | undefined) {
    if (locale === undefined) {
        return defaultLocale;
    }

    return locale;
}

export function getPathFromUrl(url: URL) {
    let pathname = url.pathname;
    let locale = defaultLocale;
    const parts = pathname?.split("/");
    const possibleLocale = parts[1];

    // First check if we are on default locale
    if (locales.includes(possibleLocale)) {
        locale = possibleLocale;
        pathname = pathname.substring(3, pathname.length);
    }

    return pathname;
}

// i18n routing
export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        if (locale == defaultLocale) {
            return { params: { lang: undefined } };
        } else {
            return { params: { lang: locale } };
        }
    });

    return paths;
}
