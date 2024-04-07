import groq from "groq";

export const allPostsQuery = groq`
  *[_type == "post" && language == $language]{
    title,
    slug,
    language,
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      title,
      slug,
      language,
      body
    },
  }
`;
