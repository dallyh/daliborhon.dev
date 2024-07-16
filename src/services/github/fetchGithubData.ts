import { GITHUB_API_AUTH_TOKEN } from "astro:env/server"

export async function fetchGithubData(url: string) {
	const headers = {
		Authorization: `Bearer ${GITHUB_API_AUTH_TOKEN}`,
	};

	try {
		const res = await fetch(url, { headers });

		if (!res.ok) {
			throw new Error(`Invalid response: ${res.status} - ${await res.json()}`);
		}

		const data = await res.json();

		if ("error" in data) {
			throw new Error(`The response contains error: ${data}`);
		}

		return data;
	} catch (err) {
		console.log(`Could not get GitHub data: ${err}`);
		throw err;
	}
}
