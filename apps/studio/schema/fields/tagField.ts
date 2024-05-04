import { defineField, type ArrayRule } from "sanity";

function getTagField(required = false) {
	return defineField({
		name: "tags",
		title: "Tags",
		type: "array",
		validation: required ? (rule) => rule.required() : undefined,
		of: [
			{
				type: "reference",
				to: {
					type: "tag",
				},
			},
		],
	});
}

export default getTagField;
