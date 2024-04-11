// This all has to be currently in one file, as sanity typegen does not support imports from other files.
import groq from "groq";

/******* Fragments ********/
const categoryMetaFragment = `
    _id,
    "title": title[_key == $language][0].value,
    "slug": slug[_key == $language][0].value,
    "description": description[_key == $language][0].value,
`;

const imageMetadataFragment = `
    ...,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.width,
    "blurHash": asset->metadata.blurHash,
    "lqip": asset->metadata.lqip,
    "url": asset->url,
    "title": asset->title,
    "description": asset->description,
    "altText": asset->altText,
    "extension": asset->extension
`;

const postMetaFragment = `
    _id,
    title,
    slug,
    language,
    headline,
    publishedAt,
    updatedAt,
    featured,
    tags,
    mainImage {
      ${imageMetadataFragment}
    },
    tags,
    categories[]-> {
      ${categoryMetaFragment}
    },
    body,
`;

const postTranslationReferenceFragment = `
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      "slug": slug.current
    }
`;

const projectMetadataFragment = `
    _id,
    "title": title[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    projectStartDate,
    projectSourceUrl,
    projectTags,
    icon {
      icon,
      metadata {
        size,
        collectionId,
        inlineSvg,
        color
      }
    },
`;

/******* Queries ********/

/* Posts */
export const postQuery = groq`
*[_type == "post" && language == $language && _id == $id][0] {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

export const allPostsQuery = groq`
*[_type == "post" && language == $language] | order(publishedAt desc) {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

export const recentPostsQuery = groq`
*[_type == "post" && language == $language][0...$recentItems] | order(publishedAt desc) {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

export const allPostsByCategoryQuery = groq`
*[_type == "post" && language == $language && references($categoryId)] | order(publishedAt desc) {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

export const allPostsByTagQuery = groq`
*[_type == "post" && language == $language && count(tags[value == $postTag]) > 0] | order(publishedAt desc) {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

export const allFeaturedPostsQuery = groq`
*[_type == "post" && language == $language && featured == true] | order(publishedAt desc) {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

export const recentFeaturedPostsQuery = groq`
*[_type == "post" && language == $language && featured == true][0...$recentItems] | order(publishedAt desc) {
    ${postMetaFragment}
    ${postTranslationReferenceFragment}
}
`;

/* Tags */
export const allUniqueTagsQuery = groq`
{
  "tags": array::unique(
    *[tags != null].tags[].label
  )
}
`;

/* Categories */
export const categoryQuery = groq`
*[_type == "category" && _id == $id][0] {
    ${categoryMetaFragment}
}
`;

export const allCategoriesQuery = groq`
*[_type == "category"] | order(title[_key == $language][0].value desc) {
    ${categoryMetaFragment}
}
`;

/* Projects */
export const projectQuery = groq`
*[_type == "project" && _id == $id][0] {
    ${projectMetadataFragment}
}
`;

export const allProjectsQuery = groq`
*[_type == "project"] | order(projectStartDate desc) {
    ${projectMetadataFragment}
}
`;
