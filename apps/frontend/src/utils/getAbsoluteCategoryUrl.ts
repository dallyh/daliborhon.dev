import { getRelativeLocaleUrl } from "astro:i18n";
import type { IGenCategoryMetaFragment } from "@services/graphql/__generated/sdk";
import type { Category } from "@services/sanity/queries/categories";
import { slugifyStr } from "./slugifyStr";

export function getCategoryUrl(locale: string, category: Category) {
    return getRelativeLocaleUrl(locale, `blog/categories/${category.slug}/`);
}
