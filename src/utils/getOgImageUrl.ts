import type { CollectionEntry } from "astro:content";
import { removeTrailingSlash } from "./removeTrailingSlash";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getOgImageUrl(locale: string, post: CollectionEntry<"posts">, url: URL) {
    const ogImageUrl = typeof post.data.ogImage === "string" ? post.data.ogImage : post.data.ogImage?.src;

    //return new URL(ogImageUrl ?? removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`)), url.origin).href;
    return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`));
}
