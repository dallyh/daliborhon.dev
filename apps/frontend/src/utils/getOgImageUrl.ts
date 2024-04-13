import { getRelativeLocaleUrl } from "astro:i18n";
import type { Post } from "@services/sanity/queries/posts";
import { removeTrailingSlash } from "./removeTrailingSlash";

export function getOgImageUrl(locale: string, post: Post, url: URL) {
    // For automatically generated images
    // In dev mode, the trailing slash has to be present when it is set in the config
    if (import.meta.env.DEV) {
        return getRelativeLocaleUrl(locale, `/blog/posts/${post.slug}.png`);
    }

    return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${post.slug}.png`));
}
