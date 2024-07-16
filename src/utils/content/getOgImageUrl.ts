import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { removeTrailingSlash } from "../removeTrailingSlash";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getOgImageUrl(locale: string, post: CollectionEntry<"posts">, url: URL) {
	// For automatically generated images
	// In dev mode, the trailing slash has to be present when it is set in the config
	if (import.meta.env.DEV) {
		return getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`);
	}

	return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`));
}
