import type { CollectionEntry } from "astro:content";
import { removeTrailingSlash } from "./removeTrailingSlash";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";

export function getOgImageUrl(locale: string, post: CollectionEntry<"posts">, url: URL) {
    const base = removeTrailingSlash(import.meta.env.BASE_URL);

    // Uploaded or external images
    if (typeof post.data.ogImage === "string") {
        if (isValidHttpUrl(post.data.ogImage)) {
            return post.data.ogImage;
        }

        return `${base}${post.data.ogImage}`;
    }

    // Currently unused, as CMS uploads the images and adds a relative path
    // Here for future improvements
    if (post.data.ogImage?.src !== undefined) {
        return new URL(`${base}${post.data.ogImage.src}`, url.origin).href;
    }

    // For automatically generated images
    // In dev mode, the trailing slash has to be present when it is set in the config
    if (import.meta.env.DEV) {
        return getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`);
    }

    return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`));
}

function isValidHttpUrl(url: string) {
    try {
        const _ = new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}
