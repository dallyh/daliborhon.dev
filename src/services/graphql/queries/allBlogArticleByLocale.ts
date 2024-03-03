import { gql } from "graphql-request";

export const q_allBlogArticleByLocale = gql`
    query allBlogArticleByLocale($locale: String, $after: String) {
        allBlogArticle(locale: $locale, after: $after) {
            edges {
                cursor
                node {
                    _meta {
                        publishedAt
                        updatedAt
                        locale
                    }
                    author(locale: $locale) {
                        bio
                        id
                        name
                    }
                    category(locale: $locale) {
                        name
                        id
                    }
                    id
                    teaserDesciption
                    teaserHeadline
                    teaserImage {
                        height
                        width
                        title
                        src
                        blurHash
                        description
                    }
                    text(locale: $locale) {
                        json
                    }
                    title
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
