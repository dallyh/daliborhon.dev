import { getToken } from "./auth";
import { Logger } from "@logger";
import { UMAMI_URL, UMAMI_SITE_ID } from "astro:env/client";

const logger = new Logger("umami-client");
const token = await getToken();

export async function getPageViews(url: string) {
	const endpoint = `${UMAMI_URL}/api/websites/${UMAMI_SITE_ID}/stats`;
	const query = {
		url: url,
		startAt: "0",
		endAt: Date.now().toString(),
	};
	const params = new URLSearchParams(query);

	const res = await fetch(`${endpoint}?${params.toString()}`, {
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		logger.error(`Invalid response: ${res.status} : ${res.statusText}`);
		throw Error(`Invalid response: ${res.status} : ${res.statusText}`);
	}

	const data = await res.json();
	return data;
}
