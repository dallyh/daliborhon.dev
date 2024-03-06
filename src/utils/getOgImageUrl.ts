import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";
import { removeTrailingSlash } from "./removeTrailingSlash";
import type { IGenBlogArticleMetaFragment } from "@services/graphql/__generated/sdk";

export function getOgImageUrl(locale: string, post: IGenBlogArticleMetaFragment, url: URL) {
    const base = removeTrailingSlash(import.meta.env.BASE_URL);

    // Uploaded or external images
    if (post.teaserImage?.src) {
        return post.teaserImage?.src;
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
