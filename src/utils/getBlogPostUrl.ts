import { getRelativeLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";
import type { IGenBlogArticleMetaFragment } from "@services/graphql/__generated/sdk";

export function getBlogPostUrl(locale: string, post: IGenBlogArticleMetaFragment) {
    return getRelativeLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}
