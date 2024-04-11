// This all has to be currently in one file, as sanity typegen does not support imports from other files.

import groq from "groq";
import type { BlockContent } from "@daliborhon.dev/studio/groq";
import { q, makeSafeQueryRunner, sanityImage, type InferType, z } from "groqd";

type Unpacked<T> = T extends (infer U)[] ? U : T;

/* Fragments */
const categoryMetaFragment = `
  _id,
  "title": title[_key == $language][0].value,
  "slug": slug[_key == $language][0].value,
  "description": description[_key == $language][0].value,
`;

const tagArray = q.array(
    q.object({
        value: q.string(),
        label: q.string(),
    }),
);



const postMeta = {
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    language: q.string(),
    headline: q.string(),
    publishedAt: q.date(),
    updatedAt: q.date().optional(),
    featured: q.boolean(),
    tags: tagArray,
    body: q.contentBlock(),
    mainImage: sanityImage("mainImage", {
        additionalFields: {
            altText: q.string().nullable(),
            description: q.string().nullable(),
        },
        withAsset: ["base", "blurHash"],
    }),
    _translations: q("*[_type == 'translation.metadata'&& references(^._id)].translations[].value", { isArray: true })
        .deref()
        .grab({
            slug: q.slug("slug"),
        }),
};

/* Posts */
const postQuery = q("*", { isArray: false }).filterByType("post").filter("language == $language").filter("_id == $id").grab(postMeta);
const allPostsQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").order("publishedAt desc").grab(postMeta);
const recentPostsQuery = (maxItems: number) => {
    return q("*", { isArray: true }).filterByType("post").filter("language == $language").slice(0, maxItems).order("publishedAt desc").grab(postMeta);
};
const allPostsByCategoryQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("references($categoryId)").order("publishedAt desc").grab(postMeta);
const allPostsByTagQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("count(tags[value == $tag]) > 0").order("publishedAt desc").grab(postMeta);
const allFeaturedPostsQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("featured == true").order("publishedAt desc").grab(postMeta);

export type PostsQueryResult = InferType<typeof postQuery>;
export type Post = Unpacked<PostsQueryResult>;

/* Tags */
const tags = q("").grab({
    tags: q("array::unique(*[tags != null].tags[].label)", { isArray: true }),
});

export type Tag = InferType<typeof tags>;

export const allUniqueTagsQuery = groq`
{
  "tags": array::unique(
    *[tags != null].tags[].label
  )
}
`;

/* Categories */
export const allCategoriesByLanguagQuery = groq`
*[_type == "category"] | order(title[_key == $language][0].value desc) {
  ${categoryMetaFragment}
}
`;

/* Projects */
export const allProjectsQuery = groq`
*[_type == "project"] | order(_id) [0...999] | order(projectStartDate desc) {
  _id,
  "title": title[_key == $language][0].value,
  "description": description[_key == $language][0].value,
  projectStartDate,
  projectTags[]-> {
    "title": title[_key == $language][0].value,
    color,
  },
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
