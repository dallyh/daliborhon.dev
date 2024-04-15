import { type InferType, q } from "groqd";
import { getLocalizedArrayQuery } from "../utils/queryUtils";

export const categoryMetaSchema = {
	_id: q.string(),
	title: getLocalizedArrayQuery("title"),
	slug: getLocalizedArrayQuery("slug", true),
	description: getLocalizedArrayQuery("description"),
};

export const allCategoriesQuery = q("*").filterByType("category").order("title[_key == $language][0].value desc").grab(categoryMetaSchema);

export type Category = Unpacked<InferType<typeof allCategoriesQuery>>;
