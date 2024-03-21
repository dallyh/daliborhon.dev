import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllBlogArticlesByLocale {
    locale: string;
    first: number;
    arr?: IGenBlogArticleMetaFragment[];
}

export const getRecentBlogArticlesByLocale = async ({ locale, first, arr = [] }: GetAllBlogArticlesByLocale): Promise<IGenBlogArticleMetaFragment[]> => {
    const { allBlogArticle } = await caisyClient.recentBlogArticlesByLocale({ locale, first });

    allBlogArticle?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    return arr as IGenBlogArticleMetaFragment[];
};
