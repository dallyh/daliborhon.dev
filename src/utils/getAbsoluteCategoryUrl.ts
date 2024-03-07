import type { CollectionEntry } from "astro:content";
import { getAbsoluteLocaleUrl } from "astro:i18n";
import { getBlogPostSlug } from "./getBlogPostSlug";
import type { IGenCategoryMetaFragment } from "@services/graphql/__generated/sdk";
import { slugifyStr } from "./slugifyStr";

export function getAbsoluteCategoryUrl(locale: string, category: IGenCategoryMetaFragment) {
    return getAbsoluteLocaleUrl(locale, `blog/categories/${slugifyStr(locale, category?.name!)}/`);
}
