import type { CollectionEntry } from "astro:content";
import { getAbsoluteLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";
import type { IGenBlogArticleMetaFragment } from "@services/graphql/__generated/sdk";

export function getAbsoluteBlogPostUrl(locale: string, post: IGenBlogArticleMetaFragment) {
    return getAbsoluteLocaleUrl(locale, `blog/posts/${getBlogPostSlug(locale, post)}/`);
}
