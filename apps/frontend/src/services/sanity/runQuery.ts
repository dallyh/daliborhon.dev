import { sanityClient } from "sanity:client";
import { makeSafeQueryRunner } from "groqd";

export const runQuery = makeSafeQueryRunner((query, params: Record<string, unknown> = {}) => sanityClient.fetch(query, params));
