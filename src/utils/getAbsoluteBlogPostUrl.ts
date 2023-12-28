import { getAbsoluteLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getAbsoluteBlogPostUrl(locale: string, slug: string) {
    return getAbsoluteLocaleUrl(locale, `blog/posts/${getBlogPostSlug(slug)}/`);
}