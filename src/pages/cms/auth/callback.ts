import { handleCallback } from "@lib/auth";
import type { APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	return handleCallback(request);
};
