// This all has to be currently in one file, as sanity typegen does not support imports from other files.

import { q, sanityImage, type InferType, z } from "groqd";
import { __Type } from "graphql";
import { contentBlockSchema } from "../schemas/contentBlockSchema";

const postMetaFragment = {
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    language: q.string(),
    headline: q.string(),
    publishedAt: q.date(),
    updatedAt: q.date().nullable(),
    featured: q.boolean(),
    tags: q.array(
        q.object({
            value: q.string(),
            label: q.string(),
        }),
    ),
    body: contentBlockSchema,
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

export const allPostsQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").order("publishedAt desc").grab(postMetaFragment);
export const allPostsByCategoryQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("references($categoryId)").order("publishedAt desc").grab(postMetaFragment);
export const allPostsByTagQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("count(tags[value == $tag]) > 0").order("publishedAt desc").grab(postMetaFragment);
export const allFeaturedPostsQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("featured == true").order("publishedAt desc").grab(postMetaFragment);
export const recentPostsQuery = (maxItems: number) => {
    return q("*", { isArray: true }).filterByType("post").filter("language == $language").slice(0, maxItems).order("publishedAt desc").grab(postMetaFragment);
};
export const allPostsTagsQuery = q("").grab({
    tags: q("*[tags != null]").grabOne("tags[]").grabOne("label", q.string()),
});

export type Post = Unpacked<InferType<typeof allPostsQuery>>;
export type PostTag = Unpacked<InferType<typeof allPostsTagsQuery>>;
