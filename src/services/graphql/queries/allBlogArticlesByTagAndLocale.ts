import { gql } from "graphql-request";

export const q_allBlogArticlesByTagAndLocale = gql`
    query allBlogArticlesByTagAndLocale($locale: String!, $tagId: String!) {
        allBlogArticle(sort: { updatedAt: DESC, publishedAt: DESC }, where: { tags: { eq: $tagId } }) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
        }
    }
`;
