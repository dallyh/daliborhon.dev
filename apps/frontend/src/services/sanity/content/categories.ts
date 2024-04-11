import { sanityClient } from "sanity:client";
import { allCategoriesQuery, type AllCategoriesQueryResult } from "@daliborhon.dev/studio/groq";
import { defaultLocale } from "@daliborhon.dev/shared/frontend/i18n";

interface GetAllCategories {
    locale: string;
}

// TODO: Pagination
export const getAllCategories = async ({ locale = defaultLocale }: GetAllCategories): Promise<AllCategoriesQueryResult> => {
    console.log(`Getting all categories...`);

    const result = await sanityClient.fetch<AllCategoriesQueryResult>(allCategoriesQuery, { language: locale });

    return result;
};
