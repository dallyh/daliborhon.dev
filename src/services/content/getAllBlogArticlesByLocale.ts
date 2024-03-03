import { caisySDK } from "../graphql/getSdk";
import { type IGenBlogArticle } from "../graphql/__generated/sdk";

export interface GetAllBlogArticles {
    locale: string;
    after?: string;
    arr?: IGenBlogArticle[];
}

export const getPaginatedBlogArticlesByLocale = async ({ locale, after, arr = [] }: GetAllBlogArticles): Promise<IGenBlogArticle[]> => {
    const { allBlogArticle } = await caisySDK.allBlogArticleByLocale({ locale, after });

    allBlogArticle?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allBlogArticle?.pageInfo?.hasNextPage) {
        return await getPaginatedBlogArticlesByLocale({
            locale: locale,
            after: allBlogArticle?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    return arr as IGenBlogArticle[];
};
