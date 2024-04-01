import { gql } from "@apollo/client";

const f_tagMeta = gql`
    fragment tagMeta on Caisy_Field_Tag {
        color
        id
        name
    }
`;
