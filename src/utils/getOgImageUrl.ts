import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";
import { removeTrailingSlash } from "./removeTrailingSlash";
import type { IGenBlogArticleMetaFragment } from "@services/graphql/__generated/sdk";

export function getOgImageUrl(locale: string, post: IGenBlogArticleMetaFragment, url: URL) {
    // For automatically generated images
    // In dev mode, the trailing slash has to be present when it is set in the config
    if (import.meta.env.DEV) {
        return getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`);
    }

    return removeTrailingSlash(getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(locale, post)}.png`));
}
