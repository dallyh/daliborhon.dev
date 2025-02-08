import chokidar from "chokidar";
import { exec } from "node:child_process";
import { Logger } from "./src/logger.ts";
import { glob } from "node:fs/promises";

var logger = new Logger("watch");

function compileParaglide(operation: string, path: string) {
	logger.info(`[${operation}] File: ${path}`);
	logger.info("Running compile command...");

	exec("pnpm run compile:paraglide", (err, stdout, stderr) => {
		if (err) {
			logger.error(`Error executing command: ${err}`);

			if (stderr) {
				console.error(stderr);
			}

			if (stdout) {
				console.error(stdout);
			}

			return;
		}
		logger.info(stdout === "" ? "Paraglide done." : stdout);
	});
}

function compileTypescript(operation: string, path: string) {
	logger.info(`[${operation}] File: ${path}`);
	logger.info("Running TSC compile command...");

	exec("pnpm tsc --incremental", (err, stdout, stderr) => {
		if (err) {
			logger.error(`Error executing command: ${err}`);

			if (stderr) {
				console.error(stderr);
			}

			if (stdout) {
				console.error(stdout);
			}

			return;
		}
		logger.info(stdout === "" ? "TSC done." : stdout);
	});
}

// Paraglide watcher
chokidar
	.watch("./src/astro-i18n/messages", { ignoreInitial: true })
	.on("change", (path) => compileParaglide("change", path))
	.on("add", (path) => compileParaglide("add", path))
	.on("unlink", (path) => compileParaglide("delete", path));

// TS Watcher
chokidar
	.watch(await Array.fromAsync(glob("./src/**/*.{ts,mjs,js}")), { ignoreInitial: true })
	.on("change", (path) => compileTypescript("change", path))
	.on("add", (path) => compileTypescript("add", path))
	.on("unlink", (path) => compileTypescript("delete", path));

logger.info("Watching for file changes...");
