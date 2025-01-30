import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	themes: ["dracula-soft", "github-light"],
	themeCssSelector: (theme) => {
		return `[data-theme='${theme.type}']`;
	}
});
