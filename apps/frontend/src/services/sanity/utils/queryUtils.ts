import { q } from "groqd";

export function getLocalizedArrayQuery(field: string, isSlug: boolean = false) {
	const fieldSelect = isSlug ? "value.current" : "value";
	return q(field).filter("_key == $language").slice(0).grabOne(fieldSelect, q.string());
}
