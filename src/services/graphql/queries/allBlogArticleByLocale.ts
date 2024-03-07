import { gql } from "graphql-request";

export const q_allBlogArticleByLocale = gql`
    query allBlogArticleByLocale($locale: String!, $after: String) {
        allBlogArticle(locale: $locale, after: $after, sort: { updatedAt: DESC, publishedAt: DESC }) {
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
