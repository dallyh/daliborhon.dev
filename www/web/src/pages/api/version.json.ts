import type { APIRoute } from "astro";
import childProcess from "node:child_process";

// obtain Git commit hash
const hash = childProcess.execSync("git rev-parse --short HEAD").toString().trim();

export const GET: APIRoute = () => {
	const versionMetadata = {
		hash,
	};
	return new Response(JSON.stringify(versionMetadata), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
