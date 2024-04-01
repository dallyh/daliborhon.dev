import { getAbsoluteLocaleUrl } from "astro:i18n";
import type { IGenCategoryMetaFragment } from "@services/graphql/__generated/sdk";
import { slugifyStr } from "./slugifyStr";

export function getAbsoluteCategoryUrl(locale: string, category: IGenCategoryMetaFragment) {
    return getAbsoluteLocaleUrl(locale, `blog/categories/${slugifyStr(locale, category?.name!)}/`);
}
