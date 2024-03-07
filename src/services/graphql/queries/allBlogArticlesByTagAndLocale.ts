import { gql } from "graphql-request";

export const q_allBlogArticlesByTagAndLocale = gql`
    query allBlogArticlesByTagAndLocale($locale: String!, $tagId: String!, $after: String) {
        allBlogArticle(locale: $locale, sort: { updatedAt: DESC, publishedAt: DESC }, where: { tags: { eq: $tagId } }, after: $after) {
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
