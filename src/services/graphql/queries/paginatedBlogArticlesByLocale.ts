import { gql } from "graphql-request";

export const q_paginatedBlogArticlesByLocale = gql`
    query q_paginatedBlogArticlesByLocale($locale: String, $first: Int!, $after: String) {
        allBlogArticle(sort: { updatedAt: DESC, publishedAt: DESC }, locale: $locale, first: $first, after: $after) {
            edges {
                cursor
                node {
                    ...blogArticleMeta
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
            totalCount
        }
    }
`;
