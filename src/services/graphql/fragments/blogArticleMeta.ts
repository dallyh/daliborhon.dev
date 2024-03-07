import { gql } from "graphql-request";

const f_blogArticleMeta = gql`
    fragment blogArticleMeta on BlogArticle {
        _meta {
            createdAt
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
            ...categoryMeta
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
        tags {
            ...tagMeta
        }
        featured
    }
`;
