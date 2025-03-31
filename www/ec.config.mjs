import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	themes: ["houston", "github-light"],
	themeCssSelector: (theme) => {
		return `[data-theme='${theme.type}']`;
	},
	styleOverrides: {
		codeFontFamily: "var(--default-mono-font-family)",
		uiFontFamily: "var(--default-font-family)",
		frames: {
			editorActiveTabIndicatorTopColor: "var(--color-primary)",
		},
	},
});
