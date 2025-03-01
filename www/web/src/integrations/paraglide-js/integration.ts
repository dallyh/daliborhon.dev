import { type CompilerOptions, paraglideVitePlugin } from "@inlang/paraglide-js";
import { compile } from "@inlang/paraglide-js";
import type { AstroIntegration } from "astro";
import type { Plugin } from "vite";

type IntegrationOptions = {
	project: string;
	outdir: string;
};

export function paraglideIntegration(options: IntegrationOptions): AstroIntegration {
	const { project, outdir } = options;

	const paraglideOptions: CompilerOptions = {
		project: project,
		outdir: outdir,
	};

	return {
		name: "paraglide-integration",
		hooks: {
			"astro:config:setup": async ({ updateConfig, command, logger }) => {
				if (command === "dev") {
					updateConfig({
						vite: {
							plugins: [paraglideVitePlugin(paraglideOptions) as Plugin],
						},
					});
				}

				logger.info("Setup done");
			},
			"astro:build:setup": async ({ logger }) => {
				await compile(paraglideOptions);
				logger.info("Compiled paraglide project");
			},
		},
	};
}
