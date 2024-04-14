import type { APIContext, MiddlewareNext } from "astro";
import { sequence } from "astro:middleware";

// This middleware catches errors inside imported components
// https://discord.com/channels/830184174198718474/1229135124591804446
async function errorHandler(_: APIContext, next: MiddlewareNext) {
    try {
        return await next();
    } catch (err) {
        const error = err as Error;
        return new Response(`${error.message}`, { status: 500, statusText: "Internal server error" });
    }
}

export const onRequest = sequence(errorHandler);
