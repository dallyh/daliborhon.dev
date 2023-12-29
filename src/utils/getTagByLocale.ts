import { getCollection, getEntry } from "astro:content";

export async function getTagByLocale(locale: string, tagId: string) {
    const tag = await getEntry("tags", tagId);

    if (tag === undefined) {
        throw Error(`getTagByLocale: tag ${locale}/${tagId} was undefined.`);
    }

    for (const [locale, value] of Object.entries(tag.data)) {
        if (locale === locale) {
            return value;
        }
    }

    console.warn(`getTagByLocale: tag ${locale}/${tagId} had no localized entry.`);
    return "";
}
