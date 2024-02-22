import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugifyStr";

/**
 * Create a localized slug from a title
 * CMS currently does not save i18n slugs localized into locale folders
 * The slug is always the same depending on the default locale set in the config
 * Final slug should match the CMS saved slug, although localized
 * Title in the post should not be changed, because the slug changes then too (this also happens in the CMS)
 * @param locale the locale for localized slug
 * @param post post from the "posts" collection
 * @returns localized slug
 */
export function getBlogPostSlug(locale: string, post: CollectionEntry<"posts">) {
    // Match the CMS settings
    // First we try to get the data from the filename (slug)
    //"{{year}}-{{month}}-{{day}}-{{slug}}"
    const regex = /^(\d{4})-(\d{2})-(\d{2})/;
    const filename = post.slug.split("/")[1];
    const slug = slugifyStr(locale, post.data.title);

    const match = filename.match(regex);
    if (match) {
        const [, year, month, day] = match;
        const date = `${year}-${month}-${day}`;

        return `${date}-${slug}`;
    }

    // As a fallback we can use the published time
    const year = post.data.pubDateTime.getFullYear();
    const month = (post.data.pubDateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = post.data.pubDateTime.getDate().toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    return `${date}-${slug}`;
}
