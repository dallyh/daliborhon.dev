import { defineMarkdocConfig, component, nodes } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
	nodes: {
		fence: {
			attributes: { ...nodes.fence.attributes, title: { type: String, render: "title" } },
			render: component("./src/components/astro/content/Code.astro"),
		},
	},
	tags: {
		aside: {
			attributes: {
				type: { type: String },
				title: { type: String },
			},
			render: component("./src/components/astro/content/Aside.astro"),
		},
	},
});
