// This all has to be currently in one file, as sanity typegen does not support imports from other files.

import { q, sanityImage, type InferType, z } from "groqd";
import { __Type } from "graphql";
import { contentBlockSchema } from "../schemas/contentBlockSchema";
import { categoryMetaSchema } from "./categories";

const postTagSchema = q.array(
    q.object({
        value: q.string(),
        label: q.string(),
    }),
);

const postMetaFragment = {
    _id: q.string(),
    title: q.string(),
    slug: q.slug("slug"),
    language: q.string(),
    headline: q.string(),
    publishedAt: q.date(),
    updatedAt: q.date().nullable(),
    featured: q.boolean(),
    tags: postTagSchema,
    body: contentBlockSchema,
    categories: q("categories[]", { isArray: true }).deref().grab(categoryMetaSchema),
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
            language: q.string(),
        }),
};

export const allPostsQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").order("publishedAt desc").grab(postMetaFragment);

export const allPostsByCategoryQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("references($categoryId)").order("publishedAt desc").grab(postMetaFragment);

export const allPostsByTagQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("count(tags[value == $tag]) > 0").order("publishedAt desc").grab(postMetaFragment);

export const allFeaturedPostsQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("featured == true").order("publishedAt desc").grab(postMetaFragment);

export const recentFeaturedPostsQuery = (maxRecent: number = -1) => {
    return q("*", { isArray: true })
        .filterByType("post")
        .filter("language == $language")
        .slice(0, maxRecent === -1 ? -1 : maxRecent - 1)
        .filter("featured == true")
        .order("publishedAt desc")
        .grab(postMetaFragment);
};

export const recentPostsQuery = (maxRecent: number = -1) => {
    return q("*", { isArray: true })
        .filterByType("post")
        .filter("language == $language")
        .slice(0, maxRecent === -1 ? -1 : maxRecent - 1)
        .order("publishedAt desc")
        .grab(postMetaFragment);
};

export const allPostsTagsQuery = q("*[tags != null].tags[]", { isArray: true }).grab({
    label: q.string(),
    value: q.string(),
});

export type Post = Unpacked<InferType<typeof allPostsQuery>>;
export type PostTag = Unpacked<InferType<typeof postTagSchema>>;
