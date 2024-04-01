import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllBlogArticlesByTagAndLocale {
    locale: string;
    tagId: string;
    after?: string;
    arr?: IGenBlogArticleMetaFragment[];
}

export const getAllBlogArticlesByTagAndLocale = async ({ locale, tagId, after, arr = [] }: GetAllBlogArticlesByTagAndLocale): Promise<IGenBlogArticleMetaFragment[]> => {
    const { allBlogArticle } = await caisyClient.allBlogArticlesByTagAndLocale({ locale, tagId, after });

    allBlogArticle?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allBlogArticle?.pageInfo?.hasNextPage) {
        return await getAllBlogArticlesByTagAndLocale({
            locale: locale,
            tagId,
            after: allBlogArticle?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    return arr as IGenBlogArticleMetaFragment[];
};
