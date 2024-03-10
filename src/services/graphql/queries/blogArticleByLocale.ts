import { gql } from "@apollo/client";

export const q_blogArticleByLocale = gql`
    query blogArticleByLocale($id: ID!, $locale: String!) {
        BlogArticle(id: $id, locale: $locale) {
            ...blogArticleMeta
        }
    }
`;
