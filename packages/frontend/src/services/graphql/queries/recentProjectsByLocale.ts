import { gql } from "@apollo/client";

export const q_recentProjectsByLocale = gql`
    query recentProjectsByLocale($locale: String!, $first: Int!) {
        allProject(locale: $locale, first: $first, sort: { projectStartDate: DESC }) {
            edges {
                node {
                    ...projectMeta
                }
            }
        }
    }
`;
