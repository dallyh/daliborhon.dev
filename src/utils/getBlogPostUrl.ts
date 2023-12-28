import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getBlogPostUrl(locale: string, slug: string) {
    return getRelativeLocaleUrl(locale,`blog/posts/${getBlogPostSlug(slug)}/`)
}