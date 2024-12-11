import { GITHUB_API_AUTH_TOKEN } from "astro:env/server";
import { Octokit } from "octokit";

export const githubRestClient = (() => {
	if (!GITHUB_API_AUTH_TOKEN) {
		throw new Error("GitHub API authentication token is missing. Please set GITHUB_API_AUTH_TOKEN in environment variables.");
	}

	const octokit = new Octokit({ auth: GITHUB_API_AUTH_TOKEN });
	octokit.rest.rateLimit.get().then((res) => {
		console.log("Github rate limit: " + res.data.rate.remaining + "/" + res.data.rate.limit);
	});
	
	return octokit.rest;
})();
