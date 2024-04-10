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

export const allPostsQuery = groq`
*[_type == "post" && language == $language && _id > $lastId] | order(_id) [0...100] {
  ${postMetaFragment}
}
`;

// TODO
export const allPostsByCategory = groq`
*[_type == "post" && language == $language && _id > $lastId] | order(_id) [0...100] {
  ${postMetaFragment}
}
`;

// TODO
export const allPostsByTag = groq`
*[_type == "post" && language == $language && _id > $lastId] | order(_id) [0...100] {
  ${postMetaFragment}
}
`;

// TODO
export const allCategoriesQuery = groq`
*[_type == "category" && language == $language && _id > $lastId] | order(_id) [0...100] {
  ${categoryMetaFragment}
}
`;
