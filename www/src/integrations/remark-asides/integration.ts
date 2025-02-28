import type { AstroIntegration } from "astro";
import remarkDirective from "remark-directive";
import remarkAsides from "./remark-asides.mjs";

export function remarkAsidesIntegration(): AstroIntegration {
	return {
		name: "remark-asides-integration",
		hooks: {
			"astro:config:setup": ({ updateConfig, injectScript }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [remarkDirective, remarkAsides],
					},
				});

				injectScript("page-ssr", `import "${new URL("./remark-asides.css", import.meta.url)}";`);
			},
		},
	};
}
