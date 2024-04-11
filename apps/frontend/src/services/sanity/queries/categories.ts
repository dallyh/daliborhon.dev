import groq from "groq";
import { q, type InferType } from "groqd";
import { getLocalizedArrayQuery } from "../utils/queryUtils";

const categoryMetaSchema = {
    _id: q.string(),
    title: getLocalizedArrayQuery("title"),
    slug: getLocalizedArrayQuery("slug"),
    description: getLocalizedArrayQuery("description"),
};

export const allCategoriesQuery = q("*").filterByType("category").order("title[_key == $language][0].value desc").grab(categoryMetaSchema);

export type Category = Unpacked<InferType<typeof allCategoriesQuery>>;
