import { getRelativeLocaleUrl } from "astro:i18n";
import type { Category } from "@services/sanity/queries/categories";

export function getCategoryUrl(locale: string, category: Category) {
    return getRelativeLocaleUrl(locale, `blog/categories/${category.slug}/`);
}
