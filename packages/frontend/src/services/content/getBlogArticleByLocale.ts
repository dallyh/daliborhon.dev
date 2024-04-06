import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllBlogArticles {
    id: string;
    locale: string;
}

export const getBlogArticleByLocale = async ({ id, locale }: GetAllBlogArticles): Promise<IGenBlogArticleMetaFragment> => {
    const { BlogArticle } = await caisyClient.blogArticleByLocale({ id, locale });

    return BlogArticle as IGenBlogArticleMetaFragment;
};
