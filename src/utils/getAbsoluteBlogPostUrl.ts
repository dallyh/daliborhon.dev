import type { CollectionEntry } from "astro:content";
import { getAbsoluteLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getAbsoluteBlogPostUrl(locale: string, post: CollectionEntry<"posts">) {
    return getAbsoluteLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}
