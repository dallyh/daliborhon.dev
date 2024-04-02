import { getRelativeLocaleUrl } from "astro:i18n";
import type { IGenCategoryMetaFragment } from "@services/graphql/__generated/sdk";
import { slugifyStr } from "./slugifyStr";

export function getCategoryUrl(locale: string, category: IGenCategoryMetaFragment) {
    return getRelativeLocaleUrl(locale, `blog/categories/${slugifyStr(locale, category?.name!)}/`);
}
