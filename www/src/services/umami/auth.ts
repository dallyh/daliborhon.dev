import { UMAMI_USERNAME, UMAMI_PASSWORD } from "astro:env/server";
import { Logger } from "@logger";
import { UMAMI_URL } from "astro:env/client";

const logger = new Logger("umami-auth");

export async function getToken() {
	const request = {
		username: UMAMI_USERNAME,
		password: UMAMI_PASSWORD,
	};

	const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify(request),
	});

	if (!res.ok) {
		logger.error(`Invalid response: ${res.status} : ${res.statusText}`);
		throw Error(`Invalid response: ${res.status} : ${res.statusText}`);
	}

	logger.debug(res.statusText);

	const data = await res.json();

	return data.token;
}
