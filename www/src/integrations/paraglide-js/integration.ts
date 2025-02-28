import { paraglideVitePlugin } from "@inlang/paraglide-js";
import type { AstroIntegration } from "astro";
import type { Plugin } from "vite";

const paraglideConfig = {
	project: "./project.inlang",
	outdir: "./src/paraglide",
};

export function paraglideIntegration(): AstroIntegration {
	return {
		name: "paraglide-integration",
		hooks: {
			"astro:config:setup": ({ updateConfig, command }) => {
				if (command === "dev") {
					updateConfig({
						vite: {
							plugins: [paraglideVitePlugin(paraglideConfig) as Plugin],
						},
					});
				}
			},
		},
	};
}
