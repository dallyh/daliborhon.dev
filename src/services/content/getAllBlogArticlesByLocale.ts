import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllBlogArticles {
    locale: string;
    after?: string;
    arr?: IGenBlogArticleMetaFragment[];
}

export const getAllBlogArticlesByLocale = async ({ locale, after, arr = [] }: GetAllBlogArticles): Promise<IGenBlogArticleMetaFragment[]> => {
    const { allBlogArticle } = await caisyClient.allBlogArticleByLocale({ locale, after });

    allBlogArticle?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allBlogArticle?.pageInfo?.hasNextPage) {
        return await getAllBlogArticlesByLocale({
            locale: locale,
            after: allBlogArticle?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    return arr as IGenBlogArticleMetaFragment[];
};
