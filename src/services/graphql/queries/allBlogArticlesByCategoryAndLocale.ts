import { gql } from "graphql-request";

export const q_allBlogArticlesByCategoryAndLocale = gql`
    query allBlogArticlesByCategoryAndLocale($locale: String!, $categoryName: String!, $after: String) {
        allBlogArticle(locale: $locale, after: $after, sort: { updatedAt: DESC, publishedAt: DESC }, where: { AND: { category: { findOne: { Category: { name: { eq: $categoryName } } } } } }) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;
