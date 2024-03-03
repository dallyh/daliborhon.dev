import { gql } from "graphql-request";

export const allCategoryByLocale = gql`
    query allCategoriesByLocale($locale: String = "") {
        allCategory(locale: $locale) {
            edges {
                node {
                    id
                    name
                    _meta {
                        locale
                    }
                }
            }
            totalCount
        }
    }
`;
