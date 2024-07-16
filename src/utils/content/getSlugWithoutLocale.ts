export function getSlugWithoutLocale(slug: string) {
	// cs/2024-xxx-slug

	if (slug.indexOf("/") > 0) {
		return slug.split("/")[1];
	}

	throw new Error(`Incorrect slug ${slug}`);
}
