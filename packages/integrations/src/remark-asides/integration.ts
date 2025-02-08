import type { AstroIntegration } from "astro";
import remarkDirective from "remark-directive";
import remarkAsides from "./remark-asides.mjs";

export function remarkAsidesIntegration(): AstroIntegration {
	return {
		name: "astro-remark-asides",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [remarkDirective, remarkAsides],
					},
				});
			},
		},
	};
}
