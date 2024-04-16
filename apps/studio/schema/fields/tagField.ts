import { defineField } from "sanity";

export default defineField({
	name: "tags",
	title: "Tags",
	type: "array",
	validation: (Rule) => Rule.required(),
	of: [
		{
			type: "reference",
			to: {
				type: "tag",
			},
		},
	],
});
