import type { AstroIntegration } from "astro";
import remarkDirective from "remark-directive";
import remarkAsides from "./remark-asides";

export function remarkAsidesIntegration(): AstroIntegration {
	return {
		name: "remark-asides-integration",
		hooks: {
			"astro:config:setup": ({ updateConfig, injectScript, config, logger }) => {
				const locales = config.i18n?.locales.map((l) => {
					if (typeof l === "string") {
						return l;
					} else return l.path;
				});

				updateConfig({
					markdown: {
						remarkPlugins: [remarkDirective, [remarkAsides, { locales: locales, logger: logger }]],
					},
				});

				injectScript("page-ssr", `import "${new URL("./remark-asides.css", import.meta.url)}";`);

				logger.info("Setup done");
			},
		},
	};
}
