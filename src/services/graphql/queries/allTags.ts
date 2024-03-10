import { gql } from "@apollo/client";

export const q_allTags = gql`
    query allTags($after: String) {
        allTags(after: $after) {
            edges {
                node {
                    ...tagMeta
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;
