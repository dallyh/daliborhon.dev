import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getBlogPostUrl(locale: string, post: CollectionEntry<"posts">) {
    return getRelativeLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}
