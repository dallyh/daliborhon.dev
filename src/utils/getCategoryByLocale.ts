import { getEntry } from "astro:content";

export async function getCategoryTitleByLocale(locale: string, categoryId: string) {
    const tag = await getEntry("categories", categoryId);

    if (tag === undefined) {
        throw Error(`getCategoryByLocale: category ${locale}/${categoryId} was undefined.`);
    }

    for (const [locale, value] of Object.entries(tag.data.languages)) {
        if (locale === locale) {
            return value.title;
        }
    }

    console.warn(`getCategoryByLocale: category ${locale}/${categoryId} had no localized entry.`);
    return "";
}

export async function getCategoryDescriptionByLocale(locale: string, categoryId: string) {
    const tag = await getEntry("categories", categoryId);

    if (tag === undefined) {
        throw Error(`getCategoryDescriptionByLocale: category ${locale}/${categoryId} was undefined.`);
    }

    for (const [locale, value] of Object.entries(tag.data.languages)) {
        if (locale === locale) {
            return value.description;
        }
    }

    console.warn(`getCategoryDescriptionByLocale: category ${locale}/${categoryId} had no localized entry.`);
    return "";
}
