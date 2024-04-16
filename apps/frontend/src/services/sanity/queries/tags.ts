import { type InferType, q, sanityImage, z } from "groqd";
import { colorSchema } from "../schemas/colorSchema";


export const tagFragment = {
	slug: q.slug("slug"),
	title: q.string(),
	color: colorSchema.nullable(),
};

export const tagsFragment = q("tags[]", { isArray: true }).deref().grab(tagFragment);

export type Tag = Unpacked<InferType<typeof tagsFragment>>;