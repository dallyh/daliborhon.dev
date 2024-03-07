import { gql } from "graphql-request";

const f_categoryMeta = gql`
    fragment categoryMeta on Category {
        id
        name
        description
    }
`;
