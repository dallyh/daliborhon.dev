import slug from "slug";

export function slugifyStr(locale: string | undefined, str: string) {
	if (locale === undefined) {
		return slug(str);
	}

	return slug(str, { locale: locale });
}
