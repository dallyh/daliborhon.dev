import { allPostsTagsQuery } from "../queries/posts";
import { runQuery } from "../runQuery";

export async function getUniquePostsTags() {
	const data = await runQuery(allPostsTagsQuery);
	const tags = data.filter((obj, index, self) => index === self.findIndex((t) => t.value === obj.value));

	return tags;
}
