import { gql } from "graphql-request";

const f_blogArticleMeta = gql`
    fragment blogArticleMeta on BlogArticle {
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
        tags(locale: $locale) {
            ... on BlogPostTag {
                id
                title
                background
            }
        }
    }
`;
