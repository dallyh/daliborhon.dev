import { gql } from "graphql-request";

export const q_blogArticleByLocale = gql`
    query blogArticleByLocale($id: ID!, $locale: String!) {
        BlogArticle(id: $id, locale: $locale) {
            ...blogArticleMeta
        }
    }
`;
