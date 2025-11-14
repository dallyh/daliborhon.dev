import { UMAMI_URL } from "astro:env/client";
import { UMAMI_PASSWORD, UMAMI_USERNAME } from "astro:env/server";
import { Logger } from "@logger";

const logger = new Logger("umami-auth");

export async function getToken() {
	const request = {
		username: UMAMI_USERNAME,
		password: UMAMI_PASSWORD,
	};

	console.log(request);
	console.log(UMAMI_URL);

	const res = await fetch(`${UMAMI_URL}/api/auth/login`, {
		method: "POST",
		headers: {
			Accept: "application/json",
		},
		body: JSON.stringify(request),
	});

	console.log(res);
	console.log(await res.json());

	if (!res.ok) {
		logger.error(`Invalid response: ${res.status} : ${res.statusText}`);
		throw Error(`Invalid response: ${res.status} : ${res.statusText}`);
	}

	logger.debug(res.statusText);

	const data = await res.json();

	return data.token;
}
