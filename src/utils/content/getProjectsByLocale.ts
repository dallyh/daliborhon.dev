import { getCollection } from "astro:content";

export async function getProjectsByLocale(locale: string, sort: boolean = true, max: number | undefined = undefined) {
	let projects = await getCollection("projects", ({ data }) => {
		return data.language === locale;
	});

	if (sort) {
		projects = projects.sort((a, b) => new Date(b.data.startDate).valueOf() - new Date(a.data.startDate).valueOf());
	}

	if (max) {
		projects = projects.slice(0, max);
	}

	return projects;
}
