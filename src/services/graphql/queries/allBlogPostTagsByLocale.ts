import { gql } from "graphql-request";

export const q_allBlogPostTagsByLocale = gql`
    query allBlogPostTagsByLocale($locale: String!) {
        allBlogPostTag(locale: $locale) {
            totalCount
            edges {
                node {
                    id
                    background
                    title
                    _meta {
                        locale
                    }
                }
            }
        }
    }
`;
