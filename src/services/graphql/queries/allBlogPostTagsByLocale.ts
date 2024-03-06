import { gql } from "graphql-request";

export const q_allTags = gql`
    query allTags {
        allTags {
            edges {
                node {
                    color
                    id
                    name
                }
            }
        }
    }
`;
