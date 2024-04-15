import { getAbsoluteLocaleUrl } from "astro:i18n";

export function getAbsoluteBlogPostUrl(locale: string, slug: string) {
	return getAbsoluteLocaleUrl(locale, `blog/posts/${slug}/`);
}
