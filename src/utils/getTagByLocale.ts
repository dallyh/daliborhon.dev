import { getEntry } from "astro:content";

export async function getTagByLocale(locale: string, tagId: string | undefined) {

    if (tagId === undefined) {
        return "undefined";
    }

    const tag = await getEntry("tags", tagId);

    if (tag === undefined) {
        throw Error(`getTagByLocale: tag ${locale}/${tagId} was undefined.`);
    }

    for (const [locale, value] of Object.entries(tag.data.languages)) {
        if (locale === locale) {
            return value;
        }
    }

    console.warn(`getTagByLocale: tag ${locale}/${tagId} had no localized entry.`);
    return "undefined";
}
