import { getCollection } from "astro:content";
import type { AllowedLocales } from "@i18n-config";

export async function getProjectsByLocale(locale: string, sort: boolean = true) {
	const projects = await getCollection("projects", ({ data }) => {
		return data.language === locale;
	});

	if (sort) {
		return projects.sort((a, b) => new Date(b.data.startDate).valueOf() - new Date(a.data.startDate).valueOf());
	}
}
