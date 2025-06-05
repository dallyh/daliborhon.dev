import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
	themes: ["github-dark-default", "github-light-default"],
	themeCssSelector: (theme) => {
		return `[data-theme='${theme.type}']`;
	},
	styleOverrides: {
		codeFontFamily: "var(--default-mono-font-family)",
		uiFontFamily: "var(--default-font-family)",
		borderRadius: "0",
		frames: {
			editorActiveTabIndicatorTopColor: "var(--color-primary)",
		},
	},
});
