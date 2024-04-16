import type { SlugValidationContext } from "sanity";

export async function isUniqueAcrossAllDocuments(slug: string, context: SlugValidationContext) {

	if (!context.document) {
		return true;
	}
	const { document, getClient } = context;
	const client = getClient({ apiVersion: "2024-04-06" });

	const id = document._id.replace(/^drafts\./, "");
	const params = {
		draft: `drafts.${id}`,
		published: id,
		slug,
	};
	const query = `!defined(*[_type == ${document._type}] && [!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
	const result = await client.fetch(query, params);
	return result;
}
