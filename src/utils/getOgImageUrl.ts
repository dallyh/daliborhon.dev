import type { CollectionEntry } from "astro:content";
import { removeTrailingSlash } from "./removeTrailingSlash";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getOgImageUrl(locale: string, post: CollectionEntry<"posts">, url: URL) {
    const base = removeTrailingSlash(import.meta.env.BASE_URL);
    const ogImageUrl = typeof post.data.ogImage === "string" ? `${base}${post.data.ogImage}` : post.data.ogImage?.src;

    if (ogImageUrl) {
        return new URL(ogImageUrl, url.origin).href;
    }

    // In dev mode, the trailing slash has to be present when it is set in the config
    if (import.meta.env.DEV) {
        return getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`);
    }

    return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`));
}
