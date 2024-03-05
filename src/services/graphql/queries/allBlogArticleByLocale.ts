import { gql } from "graphql-request";

export const q_allBlogArticleByLocale = gql`
    query allBlogArticleByLocale($locale: String, $after: String) {
        allBlogArticle(sort: {updatedAt: DESC, publishedAt: DESC}, locale: $locale, after: $after) {
            edges {
                cursor
                node {
                    ...blogArticleMeta
                }
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
                startCursor
            }
            totalCount
        }
    }
`;
