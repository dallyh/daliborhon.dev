import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment, type IGenCategoryMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllCategoriesByLocale {
    locale: string;
    after?: string;
    arr?: IGenCategoryMetaFragment[];
}

export const getAllCategoriesByLocale = async ({ locale, after, arr = [] }: GetAllCategoriesByLocale): Promise<IGenCategoryMetaFragment[]> => {
    const { allCategory } = await caisyClient.allCategoriesByLocale({ locale, after });

    allCategory?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allCategory?.pageInfo?.hasNextPage) {
        return await getAllCategoriesByLocale({
            locale: locale,
            after: allCategory?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    return arr as IGenCategoryMetaFragment[];
};
