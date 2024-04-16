import type { Heading } from "@services/sanity/queries/posts";
import { slugifyStr } from "@utils";

export interface HeadingOutline extends Heading {
	subheadings?: HeadingOutline[];
}

export interface Subheading {
	subheadings: Heading[];
}

const get = (object: any, path: string[]) => path.reduce((prev, curr) => prev[curr], object);

const getObjectPath = (path: string[]) => (path.length === 0 ? path : ["subheadings"].concat(path.join(".subheadings.").split(".")));

export const parseOutline = (headings: HeadingOutline[]): HeadingOutline[] => {
	const outline: Subheading = { subheadings: [] };
	const path: string[] = [];
	let lastLevel = 0;

	headings.forEach((heading) => {
		const level = Number(heading.style.slice(1));
		heading.subheadings = [];

		if (level < lastLevel) for (let i = lastLevel; i >= level; i--) path.pop();
		else if (level === lastLevel) path.pop();

		const prop = get(outline, getObjectPath(path));
		prop.subheadings.push(heading);
		path.push((prop.subheadings.length - 1).toString());
		lastLevel = level;
	});

	return outline.subheadings as HeadingOutline[];
};

export const getChildrenText = (heading: Heading) => heading.children.map((node) => (typeof node === "string" ? node : node.text || "")).join("");
export const getHeadingSlug = (heading: Heading) => {
	const text = getChildrenText(heading);
	const slug = slugifyStr(undefined, text);

	return slug;
};
