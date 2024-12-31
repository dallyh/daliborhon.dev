export const prerender = false;

import type { APIRoute } from "astro";
import { isbot } from "isbot";
import { PageView, eq, db, count } from "astro:db";

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url).searchParams.get("url");
	if (isbot(request.headers.get("user-agent"))) {
		return new Response(
			JSON.stringify({
				error: "This endpoint is not available for bots",
			}),
			{ status: 400 },
		);
	}
	if (!url) {
		return new Response(
			JSON.stringify({
				error: "Missing URL",
			}),
			{ status: 400 },
		);
	}
	const viewCount = await db.select({ value: count() }).from(PageView).where(eq(PageView.url, url));
	return new Response(
		JSON.stringify({
			count: viewCount[0]?.value,
		}),
		{
			status: 200,
			headers: {
				"Cache-Control": "s-maxage=3600, stale-while-revalidate",
			},
		},
	);
};
