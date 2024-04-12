import { makeSafeQueryRunner } from "groqd";
import { sanityClient } from "sanity:client";

export const runQuery = makeSafeQueryRunner((query, params: Record<string, unknown> = {}) => sanityClient.fetch(query, params));
