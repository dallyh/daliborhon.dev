import type { AstroIntegration } from "astro";
import remarkDirective from "remark-directive";
import remarkAsides from "./remark-asides.mjs";

export function remarkAsidesIntegration(): AstroIntegration {
	return {
		name: "astro-remark-asides",
		hooks: {
			"astro:config:setup": ({ updateConfig, injectScript }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [remarkDirective, remarkAsides],
					},
				});

				injectScript("page-ssr", "import '@daliborhon.dev/integrations/src/remark-asides/remark-asides.css';");
			},
		},
	};
}
