import { UPTIME_API_TOKEN } from "astro:env/server";
import { siteConfig } from "@site-config";
import type { APIRoute } from "astro";

export const prerender = false;

type Status = "up" | "down";

export const GET: APIRoute = async () => {
	try {
		const res = await fetch(`https://uptime.betterstack.com/api/v2/monitors/${siteConfig.monitorId}`, {
			headers: {
				Authorization: `Bearer ${UPTIME_API_TOKEN}`,
			},
		});

		if (!res.ok) {
			return res;
		}

		const data = await res.json();

		const status: Status = data.data.attributes.status;
		return new Response(JSON.stringify({ status: status }), { status: 200 });
	} catch {
		return new Response(JSON.stringify({ status: "failed" }), { status: 500 });
	}
};
