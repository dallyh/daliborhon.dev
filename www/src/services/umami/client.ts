import { getToken } from "./auth";
import { Logger } from "@logger";

const logger = new Logger("umami-client");

const token = await getToken();
const websiteId = "7e04370d-ecba-4fd8-8d71-2d50880d0d59";

export async function getPageViews(url: string) {
	const endpoint = `https://analytics.daliborhon.dev/api/websites/${websiteId}/stats`;
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
