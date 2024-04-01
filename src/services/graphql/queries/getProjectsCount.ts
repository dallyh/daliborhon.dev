import { gql } from "@apollo/client";

const q_getProjectsCount = gql`
    query getProjectsCount {
        allProject {
            totalCount
        }
    }
`;
