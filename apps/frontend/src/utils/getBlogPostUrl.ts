import { getRelativeLocaleUrl } from "astro:i18n";
import type { Post } from "@services/sanity/queries/posts";

export function getBlogPostUrl(locale: string, post: Post) {
    return getRelativeLocaleUrl(locale, `blog/posts/${post.slug}/`);
}
