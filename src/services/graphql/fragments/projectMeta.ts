import { gql } from "@apollo/client";

const f_projectMeta = gql`
    fragment projectMeta on Project {
        _meta {
            locale
        }
        description {
            json
        }
        image {
            blurHash
            description
            src
            title
            width
            height
        }
        projectStartDate
        projectSourceUrl
        title
        projectTags {
            ... on ProjectTag {
                id
                cssColor
                color
                title
            }
        }
    }
`;
