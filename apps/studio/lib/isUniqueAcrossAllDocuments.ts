export async function isUniqueAcrossAllDocuments(slug: string, context: any) {
	const { document, getClient } = context;
	const client = getClient({ apiVersion: "2024-04-06" });

	const id = document._id.replace(/^drafts\./, "");
	const params = {
		draft: `drafts.${id}`,
		published: id,
		slug,
	};
	const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)`;
	const result = await client.fetch(query, params);
	return result;
}
