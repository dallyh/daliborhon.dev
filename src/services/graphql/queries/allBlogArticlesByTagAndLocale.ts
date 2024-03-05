import { gql } from "graphql-request";

export const q_allBlogArticlesByTagAndLocale= gql`
    query allBlogArticlesByTagAndLocale($locale: String!, $tagName: String!) {
        allBlogArticle(sort: { updatedAt: DESC, publishedAt: DESC }, where: { AND: { tags: { findOne: { BlogPostTag: { title: { eq: $tagName } } } } } }) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
        }
    }
`;
