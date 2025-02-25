import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	themes: ["plastic", "github-light"],
	themeCssSelector: (theme) => {
		return `[data-theme='${theme.type}']`;
	},
});
