import { getAbsoluteLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";
import type { CollectionEntry } from "astro:content";

export function getAbsoluteBlogPostUrl(locale: string, post: CollectionEntry<"posts">) {
    return getAbsoluteLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}