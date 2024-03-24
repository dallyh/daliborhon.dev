import { gql } from "@apollo/client";

const f_categoryMeta = gql`
    fragment categoryMeta on Category {
        id
        name
        description
    }
`;
