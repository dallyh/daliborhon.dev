export function getDevOrProdContentPath() {
	const isDevOrPreview = import.meta.env.DEV ? true : import.meta.env.PREVIEW ? true : false;
	const path = isDevOrPreview ? "dev" : "prod";

	return path;
}
