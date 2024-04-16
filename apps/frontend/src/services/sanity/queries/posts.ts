import { type InferType, q, sanityImage, z } from "groqd";
import { contentBlockSchema } from "../schemas/contentBlockSchema";
import { categoryMetaSchema } from "./categories";
import { tagFragment, tagsFragment } from "./tags";

const headingsFragment = q("body", { isArray: true })
	.filter("length(style) == 2")
	.filter("string::startsWith(style, 'h')")
	.grab({
		_key: q.string(),
		style: q.string(),
		children: q.array(
			q.object({
				text: q.string(),
			}),
		),
	});

const postMetaFragment = {
	_id: q.string(),
	title: q.string(),
	slug: q.slug("slug"),
	language: q.string(),
	headline: q.string(),
	publishedAt: q.date(),
	updatedAt: q.date().nullable(),
	featured: q.boolean(),
	tags: tagsFragment,
	body: contentBlockSchema,
	headings: headingsFragment,
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

export const allPostsByTagQuery = q("*", { isArray: true }).filterByType("post").filter("language == $language").filter("$tag in tags[]->slug.current").order("publishedAt desc").grab(postMetaFragment);

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

export const allPostsTagsQuery = q("*").filterByType("tag").filter("slug.current in (*[_type == 'post'].tags[]->slug.current)").grab(tagFragment);

export type Post = Unpacked<InferType<typeof allPostsQuery>>;
export type Heading = Unpacked<InferType<typeof headingsFragment>>;
