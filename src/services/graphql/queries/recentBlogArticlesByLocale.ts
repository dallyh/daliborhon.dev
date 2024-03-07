import { gql } from "graphql-request";

export const q_recentBlogArticlesByLocale = gql`
    query recentBlogArticlesByLocale($locale: String!, $first: Int!) {
        allBlogArticle(locale: $locale, sort: { updatedAt: DESC, publishedAt: DESC }, first: $first) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
        }
    }
`;
