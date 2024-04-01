import { gql } from "@apollo/client";

const f_blogArticleMeta = gql`
    fragment blogArticleMeta on BlogArticle {
        _meta {
            createdAt
            publishedAt
            updatedAt
            locale
            firstPublishedAt
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
        description
        previewImage {
            height
            width
            title
            src
            blurHash
            description
        }
        text(locale: $locale) {
            json
            connections {
                ... on Asset {
                    id
                    src
                    blurHash
                    width
                    title
                    description
                    height
                }
            }
        }
        title
        tags {
            ...tagMeta
        }
        featured
        slug
    }
`;
