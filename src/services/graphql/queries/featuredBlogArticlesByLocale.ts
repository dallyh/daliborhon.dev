import { gql } from "graphql-request";

export const q_featuredBlogArticlesByLocale = gql`
    query featuredBlogArticlesByLocale($locale: String!, $first: Int!, $featured: Boolean = true) {
        allBlogArticle(locale: $locale, where: { OR: { featured: $featured } }, sort: { updatedAt: DESC, publishedAt: DESC }, first: $first) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
        }
    }
`;
