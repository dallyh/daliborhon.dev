import { gql } from "@apollo/client";

export const q_allCategoriesByLocale = gql`
    query allCategoriesByLocale($locale: String!, $after: String) {
        allCategory(locale: $locale, after: $after, sort: { name: DESC }) {
            edges {
                node {
                    ...categoryMeta
                }
                cursor
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;
