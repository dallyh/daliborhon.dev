import { getEntry } from "astro:content";

export async function getTagById(tagId: string | undefined) {
	if (tagId === undefined) {
		return undefined;
	}

	const tag = await getEntry("tags", tagId);

	if (tag === undefined) {
		console.warn(`getTagById: tag ${tagId} was undefined.`);
	}

	return tag;
}
