import { UMAMI_URL } from "astro:env/client";
import { UMAMI_PASSWORD, UMAMI_USERNAME } from "astro:env/server";
import { Logger } from "@logger";

const logger = new Logger("umami-auth");

export async function getToken() {
	const request = {
		username: UMAMI_USERNAME,
		password: UMAMI_PASSWORD,
	};

	const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "dalibor-build/1.0 (+https://daliborhon.dev)",
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
