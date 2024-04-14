import { getRelativeLocaleUrl } from "astro:i18n";
import type { Post } from "@services/sanity/queries/posts";

export function getBlogPostUrl(locale: string, post: Post | string) {
    return getRelativeLocaleUrl(locale, `blog/posts/post/${typeof post === "string" ? post : post.slug}/`);
}
