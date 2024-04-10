// This all has to be currently in one file, as sanity typegen does not support imports from other files.

import groq from "groq";

/* Fragments */
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

function createTranslationReference(metadata: string) {
    const translationMetadata = `
    "_translations": *[_type == "translation.metadata" && references(^._id)].translations[].value->{
      ${metadata}
    }`;

    return translationMetadata;
}

/* Queries */

/* Posts */
export const allPostsQuery = groq`
*[_type == "post" && language == $language && _id > $lastId] | order(_id) [0...$maxItems] | order(publishedAt desc) {
  ${postMetaFragment}
  ${createTranslationReference(`"slug": slug.current`)}
}
`;

export const recentPostsQuery = groq`
*[_type == "post" && language == $language] | order(_id) [0...$maxItems] | order(publishedAt desc) {
  ${postMetaFragment}
  ${createTranslationReference(`"slug": slug.current`)}
}
`;

export const allPostsByCategory = groq`
*[_type == "post" && language == $language && _id > $lastId && references($categoryId)] | order(_id) [0...$maxItems] | order(publishedAt desc) {
  ${postMetaFragment}
  ${createTranslationReference(`"slug": slug.current`)}
}
`;

export const allPostsByTag = groq`
*[_type == "post" && language == $language && _id > $lastId && count(tags[value == "astro"]) > 0] | order(_id) [0...$maxItems] | order(publishedAt desc) {
  ${postMetaFragment}
  ${createTranslationReference(`"slug": slug.current`)}
}
`;

export const allFeaturedPosts = groq`
*[_type == "post" && language == $language && featured == true && _id > $lastId] | order(_id) [0...$maxItems] | order(publishedAt desc) {
  ${postMetaFragment}
  ${createTranslationReference(`"slug": slug.current`)}
}
`;

/* Tags */
// TBD
/*
{
  "tags": array::join(*[tags != null] { 
    "tags": array::join(tags[].value, ";")
  }.tags, ";")
}
*/

/* Categories */
export const allCategoriesByLanguagQuery = groq`
*[_type == "category"] | order(title[_key == $language][0].value desc) {
  ${categoryMetaFragment}
}
`;

/* Projects */
export const allProjectsQuery = groq`
*[_type == "project"] | order(_id) [0...$maxItems] | order(projectStartDate desc) {
  _id,
  "title": title[_key == $language][0].value,
  "description": description[_key == $language][0].value,
  projectStartDate,
  icon {
    icon,
    metadata {
      size,
      collectionId,
      inlineSvg,
      color
    }
  },
}
`;
