import { ActionError, defineAction } from "astro:actions";
import { PageView, db } from "astro:db";
import { z } from "astro:schema";
import { Logger } from "@logger";
import { isbot } from "isbot";

const logger = new Logger("actions\\page-views.ts");

export const pageViewAction = defineAction({
	input: z.object({
		url: z.string(),
	}),
	handler: async ({ url }, context) => {
		const { request } = context;

		if (isbot(request.headers.get("user-agent"))) {
			throw new ActionError({
				code: "FORBIDDEN",
				message: "This endpoint is not available for bots",
			});
		}

		if (!url) {
			throw new ActionError({
				code: "BAD_REQUEST",
				message: "Missing URL",
			});
		}

		if (url.includes("/analytics")) {
			throw new ActionError({
				code: "BAD_REQUEST",
				message: "This url is not tracked",
			});
		}

		try {
			const id = await db.insert(PageView).values([
				{
					url: url,
					date: new Date(),
				},
			]);
			logger.info(`Inserted page view for: ${url} with id: ${id.lastInsertRowid}`);
			return {};
		} catch (e) {
			logger.error((e as Error).message);
			throw new ActionError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Error updating views",
			});
		}
	},
});
