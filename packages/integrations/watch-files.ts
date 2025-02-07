import chokidar from "chokidar";
import { exec } from "node:child_process";
// @ts-ignore This file is run by node, this is required.
import { Logger } from "./src/logger.ts";

var logger = new Logger("watch");

chokidar.watch("./src/astro-i18n/messages", { ignoreInitial: true, persistent: true }).on("change", (path) => {
	logger.info(`File: ${path}`);
	exec("pnpm run compile:paraglide", (err, stdout, stderr) => {
		logger.info("Running compile command...");
		if (err) {
			logger.error(`Error executing command: ${err}`);
			logger.error(stderr);
			return;
		}
		logger.info(stdout);
	});
});

logger.info("Watching for file changes...");
