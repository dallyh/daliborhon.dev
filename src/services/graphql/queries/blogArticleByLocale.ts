import { gql } from "graphql-request";

export const blogArticleByLocale = gql`
    query blogArticleByLocale($id: ID!, $locale: String!) {
        BlogArticle(id: $id, locale: $locale) {
            author(locale: $locale) {
                _meta {
                    publishedAt
                    updatedAt
                    locale
                }
                bio
                name
            }
            _meta {
                publishedAt
                updatedAt
                locale
            }
            category(locale: $locale) {
                name
            }
            teaserDesciption
            teaserHeadline
            id
            title
            text(locale: $locale) {
                json
            }
        }
    }
`;
