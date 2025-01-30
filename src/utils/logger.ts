// Most of the work done by: https://github.com/withastro/astro/blob/23881e716457c358c8adf929a62f52237cef27cd/packages/astro/src/core/logger/core.ts

import { blue, bold, dim, gray, red, yellow } from "kleur/colors";
export type LoggerLevel = "debug" | "info" | "warn" | "error";

class Logger {
	name: string;
	isDev = import.meta.env.DEV;

	#dateTimeFormat = new Intl.DateTimeFormat([], {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});

	constructor(name: string) {
		this.name = name;
	}

	info(message: string) {
		// biome-ignore lint: logger
		console.log(`${this.#getEventPrefix({ level: "info" }) + " " + message}`);
	}
	
	warn(message: string) {
		// biome-ignore lint: logger
		console.log(`${this.#getEventPrefix({ level: "warn" }) + " " + message}`);
	}

	error(message: string) {
		// biome-ignore lint: logger
		console.log(`${this.#getEventPrefix({ level: "error" }) + " " + message}`);
	}

	debug(message: string) {
		if (!this.isDev) {
			// biome-ignore lint: logger
			console.log(`${this.#getEventPrefix({ level: "debug" }) + " " + message}`);
		}
	}

	#getEventPrefix({ level }: { level: LoggerLevel }) {
		const timestamp = `${this.#dateTimeFormat.format(new Date())}`;
		const prefix = [];
		prefix.push(bold(timestamp));
		prefix.push(`[${level.toUpperCase()}]`);

		if (this.name) {
			prefix.push(`[${this.name}]`);
		}

		if (level === "error") {
			return red(prefix.join(" "));
		}

		if (level === "warn") {
			return yellow(prefix.join(" "));
		}

		if (level === "debug") {
			return gray(prefix.join(" "));
		}

		if (prefix.length === 1) {
			return dim(prefix[0]);
		}

		return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
	}
}

export default Logger;
