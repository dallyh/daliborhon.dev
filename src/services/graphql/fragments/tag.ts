import { gql } from "graphql-request";

const f_tag = gql`
    fragment tag on Caisy_Field_Tag {
        color
        id
        name
    }
`;
