import { gql } from "@apollo/client";

const q_getArticlesCount = gql`
    query getArticlesCount {
        allBlogArticle {
            totalCount
        }
    }
`;
