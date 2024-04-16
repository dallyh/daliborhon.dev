import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook";
import type { APIRoute } from "astro";

export const prerender = false;

enum BUILD_ENVIRONMENT {
	PREVIEW = "preview",
	PROD = "production",
	ALL = "all",
}

/* Response of this endpoint */
interface BuildResponse {
	environment: string;
	triggerDate: string;
	status: "success" | "error";
	dataset: string | null;
	message?: string;
	buildStatusMessage: {
		preview?: string | null;
		production?: string | null;
	};
	cloudflareData: {
		preview?: string | null;
		production?: string | null;
	};
}

async function SerializeCloudflareResponse(cloudflareResponse: Response, res: BuildResponse, env: BUILD_ENVIRONMENT) {
	const contentType = cloudflareResponse.headers.get("content-type");

	if (contentType && contentType.indexOf("application/json") !== -1) {
		if (env === BUILD_ENVIRONMENT.PREVIEW) {
			res.cloudflareData.preview = await cloudflareResponse.json();
		}

		if (env === BUILD_ENVIRONMENT.PROD) {
			res.cloudflareData.production = await cloudflareResponse.json();
		}
	}
}
/**
 * Endpoint to trigger a build with webhook from Caisy.
 *
 * Accepted headers:
 *
 * x-webhook-build-env: What environment to build. Possible values are 'production', 'preview', 'all'.
 * sanity-webhook-signature: Secret signature to authenticate the call.
 *
 * Webhook URL's must be set in env. variables CLOUDFLARE_PREVIEW_BUILD_HOOK_URL, CLOUDFLARE_PROD_BUILD_HOOK_URL or both.
 *
 * We have to return 4xx codes, because Sanity tries to call the endpoint multiple times, when the response is 500.
 */
export const POST: APIRoute = async ({ request, locals }) => {
	const { env } = locals.runtime;

	const signature = request.headers.get(SIGNATURE_HEADER_NAME);
	const SANITY_WEBHOOK_AUTH_KEY = env.SANITY_WEBHOOK_AUTH_KEY;

	if (!SANITY_WEBHOOK_AUTH_KEY) {
		const res = {
			status: "error",
			message: "Auth key was not found on the server",
		};
		console.log(res);

		return new Response(JSON.stringify(res), { status: 400 });
	}

	if (!signature) {
		const res = {
			status: "error",
			message: "Not authorized - signature not found",
		};
		console.log(res);

		return new Response(JSON.stringify(res), { status: 401 });
	}

	const body = await request.text();
	if (!(await isValidSignature(body, signature, SANITY_WEBHOOK_AUTH_KEY))) {
		const res = {
			status: "error",
			message: "Not authorized - invalid signature",
		};
		console.log(res);

		return new Response(JSON.stringify(res), { status: 401 });
	}

	const CLOUDFLARE_PREVIEW_BUILD_HOOK_URL = env.CLOUDFLARE_PREVIEW_BUILD_HOOK_URL;
	const CLOUDFLARE_PROD_BUILD_HOOK_URL = env.CLOUDFLARE_PROD_BUILD_HOOK_URL;
	const SANITY_DATASET = request.headers.get("sanity-dataset");

	const buildEnvironment = request.headers.get("x-webhook-build-env");
	if (!buildEnvironment || Object.values(BUILD_ENVIRONMENT).includes(buildEnvironment as BUILD_ENVIRONMENT) === false) {
		const res = {
			status: "error",
			message: "No build environment selected and or wrong environment. Add a header 'x-webhook-build-env' with value 'preview', 'production' or 'all'",
		};

		console.log(res);
		return new Response(JSON.stringify(res), { status: 400 });
	}

	let buildResponse: BuildResponse = {
		environment: buildEnvironment,
		triggerDate: new Date().toISOString(),
		status: "success",
		dataset: SANITY_DATASET,
		buildStatusMessage: {},
		cloudflareData: {},
	};

	console.log("Triggering build for: " + buildEnvironment);

	if (buildEnvironment === BUILD_ENVIRONMENT.ALL) {
		if (!CLOUDFLARE_PREVIEW_BUILD_HOOK_URL || !CLOUDFLARE_PROD_BUILD_HOOK_URL) {
			buildResponse.status = "error";
			buildResponse.message = "Could not trigger build, the Cloudflare webhook URL was not provided in evironment variables.";

			console.dir(buildResponse, { depth: 3 });
			return new Response(JSON.stringify(buildResponse), { status: 400 });
		}

		const previewBuild = await fetch(CLOUDFLARE_PREVIEW_BUILD_HOOK_URL, { method: "POST" });

		if (!previewBuild.ok) {
			buildResponse.status = "error";
			buildResponse.buildStatusMessage.preview = `Could not trigger preview build: ${previewBuild.status}, ${previewBuild.statusText}.`;
		}

		const prodBuild = await fetch(CLOUDFLARE_PROD_BUILD_HOOK_URL, { method: "POST" });

		if (!prodBuild.ok) {
			buildResponse.status = "error";
			buildResponse.buildStatusMessage.production = `Could not trigger preview build: ${prodBuild.status}, ${prodBuild.statusText}.`;
		}

		await SerializeCloudflareResponse(previewBuild, buildResponse, BUILD_ENVIRONMENT.PREVIEW);
		await SerializeCloudflareResponse(prodBuild, buildResponse, BUILD_ENVIRONMENT.PROD);

		console.dir(buildResponse, { depth: 3 });

		if (buildResponse.status === "error") {
			return new Response(JSON.stringify(buildResponse), { status: 400 });
		}

		return new Response(JSON.stringify(buildResponse), { status: 200 });
	}

	if (buildEnvironment === BUILD_ENVIRONMENT.PREVIEW) {
		if (!CLOUDFLARE_PREVIEW_BUILD_HOOK_URL) {
			buildResponse.status = "error";
			buildResponse.message = "Could not trigger build, the Cloudflare webhook PREVIEW URL was not provided in evironment variables.";

			return new Response(JSON.stringify(buildResponse), { status: 400 });
		}

		const previewBuild = await fetch(CLOUDFLARE_PREVIEW_BUILD_HOOK_URL, { method: "POST" });

		if (!previewBuild.ok) {
			buildResponse.status = "error";
			buildResponse.buildStatusMessage.preview = `Could not trigger preview build: ${previewBuild.status}, ${previewBuild.statusText}.`;
		}

		await SerializeCloudflareResponse(previewBuild, buildResponse, BUILD_ENVIRONMENT.PREVIEW);

		console.dir(buildResponse, { depth: 3 });

		if (buildResponse.status === "error") {
			return new Response(JSON.stringify(buildResponse), { status: 400 });
		}

		return new Response(JSON.stringify(buildResponse), { status: 200 });
	}

	if (buildEnvironment === BUILD_ENVIRONMENT.PROD) {
		if (!CLOUDFLARE_PROD_BUILD_HOOK_URL) {
			buildResponse.status = "error";
			buildResponse.message = "Could not trigger build, the Cloudflare webhook PROD URL was not provided in evironment variables.";
		}

		const prodBuild = await fetch(CLOUDFLARE_PROD_BUILD_HOOK_URL, { method: "POST" });

		if (!prodBuild.ok) {
			buildResponse.status = "error";
			buildResponse.buildStatusMessage.production = `Could not trigger preview build: ${prodBuild.status}, ${prodBuild.statusText}.`;
		}

		await SerializeCloudflareResponse(prodBuild, buildResponse, BUILD_ENVIRONMENT.PROD);

		console.dir(buildResponse, { depth: 3 });

		if (buildResponse.status === "error") {
			return new Response(JSON.stringify(buildResponse), { status: 400 });
		}

		return new Response(JSON.stringify(buildResponse), { status: 200 });
	}

	buildResponse.status = "error";
	buildResponse.message = "Bad request (but this should not happen).";
	return new Response(null, { status: 400 });
};
