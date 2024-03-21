import { gql } from "@apollo/client";

export const q_allProjectsByLocale = gql`
    query allProjectsByLocale($locale: String!, $after: String) {
        allProject(locale: $locale, after: $after, sort: { projectStartDate: DESC }) {
            edges {
                node {
                    ...projectMeta
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;
