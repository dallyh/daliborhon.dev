import type { APIRoute } from "astro";

export const prerender = false;

/* Caisy payload */
interface Payload {
    event_id: string;
    metadata: {
        blueprint_id: string;
        document_id: string;
        document_status_id: STATUS_ID;
    };
    scope: {
        project_id: string;
    };
    webhook: { trigger: string; webhook_id: string };
}

enum STATUS_ID {
    DRAFT = 1,
    PUBLISHED = 2,
}

enum BUILD_ENVIRONMENT {
    PREVIEW = "preview",
    PROD = "prod",
    ALL = "all",
}

/* Response of this endpoint */
interface BuildResponse {
    environment: string;
    triggerDate: string;
    status: "success" | "error";
    message?: string;
    buildStatusMessage: {
        preview?: string | null;
        prod?: string | null;
    };
    cloudflareData: {
        preview?: string | null;
        prod?: string | null;
    };
}

async function SerializeCloudflareResponse(cloudflareResponse: Response, res: BuildResponse, env: BUILD_ENVIRONMENT) {
    const contentType = cloudflareResponse.headers.get("content-type");

    if (contentType && contentType.indexOf("application/json") !== -1) {
        if (env === BUILD_ENVIRONMENT.PREVIEW) {
            res.cloudflareData.preview = await cloudflareResponse.json();
        }

        if (env === BUILD_ENVIRONMENT.PROD) {
            res.cloudflareData.prod = await cloudflareResponse.json();
        }
    }
}
/**
 * Endpoint to trigger a build with webhook from Caisy.
 *
 * Accepted headers:
 *
 * x-webhook-disable-build: Disables the build completely on this endpoint. Workaround for Caisy.
 * x-webhook-auth-key: Authentification key required to run the build. Set from environment variable CAISY_WEBHOOK_AUTH_KEY.
 * x-webhook-build-env: What environment to build. Possible values are 'prod', 'preview', 'all'.
 *
 * Webhook URL's must be set in env. variables CLOUDFLARE_PREVIEW_BUILD_HOOK_URL, CLOUDFLARE_PROD_BUILD_HOOK_URL or both.
 *
 */
export const POST: APIRoute = async ({ request, locals }) => {
    const { env } = locals.runtime;

    const CAISY_WEBHOOK_AUTH_KEY = env.CAISY_WEBHOOK_AUTH_KEY;
    const CLOUDFLARE_PREVIEW_BUILD_HOOK_URL = env.CLOUDFLARE_PREVIEW_BUILD_HOOK_URL;
    const CLOUDFLARE_PROD_BUILD_HOOK_URL = env.CLOUDFLARE_PROD_BUILD_HOOK_URL;
    const DISABLE_WEBHOOK_BUILD = env.DISABLE_WEBHOOK_BUILD;

    if (DISABLE_WEBHOOK_BUILD && DISABLE_WEBHOOK_BUILD === "true") {
        return new Response(null, { status: 405 });
    }

    // Caisy has no option to disable webhook, so we disable the build on this endpoint
    const disabledByRequest = request.headers.get("x-webhook-disable-build");
    if (disabledByRequest && disabledByRequest === "true") {
        const res = {
            status: "success",
            message: "Webhook was received but the build is disabled with headers.",
        };

        console.log(res);
        return new Response(JSON.stringify(res), { status: 200 });
    }

    if (!CAISY_WEBHOOK_AUTH_KEY) {
        console.error("CAISY_WEBHOOK_AUTH_KEY was not set.");
        return new Response(null, { status: 500 });
    }

    const auth = request.headers.get("x-webhook-auth-key");

    if (!auth || auth !== CAISY_WEBHOOK_AUTH_KEY) {
        const res = {
            error: "Not authorized",
        };

        console.log(res);
        return new Response(JSON.stringify(res), { status: 401 });
    }

    const buildEnvironment = request.headers.get("x-webhook-build-env");

    if (!buildEnvironment || Object.values(BUILD_ENVIRONMENT).includes(buildEnvironment as BUILD_ENVIRONMENT) === false) {
        const res = {
            error: "No build environment selected and or wrong environment. Add a header 'x-webhook-build-env' with value 'preview', 'prod' or 'all'.",
        };

        console.log(res);
        return new Response(JSON.stringify(res), { status: 400 });
    }

    let buildResponse: BuildResponse = {
        environment: buildEnvironment,
        triggerDate: new Date().toISOString(),
        status: "success",
        buildStatusMessage: {},
        cloudflareData: {},
    };

    console.log("Triggering build for: " + buildEnvironment);

    if (buildEnvironment === BUILD_ENVIRONMENT.ALL) {
        if (!CLOUDFLARE_PREVIEW_BUILD_HOOK_URL || !CLOUDFLARE_PROD_BUILD_HOOK_URL) {
            buildResponse.status = "error";
            buildResponse.message = "Could not trigger build, the Cloudflare webhook URL was not provided in evironment variables.";

            console.dir(buildResponse, { depth: 3 });
            return new Response(JSON.stringify(buildResponse), { status: 500 });
        }

        const previewBuild = await fetch(CLOUDFLARE_PREVIEW_BUILD_HOOK_URL, { method: "POST" });

        if (!previewBuild.ok) {
            buildResponse.status = "error";
            buildResponse.buildStatusMessage.preview = `Could not trigger preview build: ${previewBuild.status}, ${previewBuild.statusText}.`;
        }

        const prodBuild = await fetch(CLOUDFLARE_PROD_BUILD_HOOK_URL, { method: "POST" });

        if (!prodBuild.ok) {
            buildResponse.status = "error";
            buildResponse.buildStatusMessage.prod = `Could not trigger preview build: ${prodBuild.status}, ${prodBuild.statusText}.`;
        }

        await SerializeCloudflareResponse(previewBuild, buildResponse, BUILD_ENVIRONMENT.PREVIEW);
        await SerializeCloudflareResponse(prodBuild, buildResponse, BUILD_ENVIRONMENT.PROD);

        console.dir(buildResponse, { depth: 3 });

        if (buildResponse.status === "error") {
            return new Response(JSON.stringify(buildResponse), { status: 500 });
        }

        return new Response(JSON.stringify(buildResponse), { status: 200 });
    }

    if (buildEnvironment === BUILD_ENVIRONMENT.PREVIEW) {
        if (!CLOUDFLARE_PREVIEW_BUILD_HOOK_URL) {
            buildResponse.status = "error";
            buildResponse.message = "Could not trigger build, the Cloudflare webhook PREVIEW URL was not provided in evironment variables.";

            return new Response(JSON.stringify(buildResponse), { status: 500 });
        }

        const previewBuild = await fetch(CLOUDFLARE_PREVIEW_BUILD_HOOK_URL, { method: "POST" });

        if (!previewBuild.ok) {
            buildResponse.status = "error";
            buildResponse.buildStatusMessage.preview = `Could not trigger preview build: ${previewBuild.status}, ${previewBuild.statusText}.`;
        }

        await SerializeCloudflareResponse(previewBuild, buildResponse, BUILD_ENVIRONMENT.PREVIEW);

        console.dir(buildResponse, { depth: 3 });

        if (buildResponse.status === "error") {
            return new Response(JSON.stringify(buildResponse), { status: 500 });
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
            buildResponse.buildStatusMessage.prod = `Could not trigger preview build: ${prodBuild.status}, ${prodBuild.statusText}.`;
        }

        await SerializeCloudflareResponse(prodBuild, buildResponse, BUILD_ENVIRONMENT.PROD);

        console.dir(buildResponse, { depth: 3 });

        if (buildResponse.status === "error") {
            return new Response(JSON.stringify(buildResponse), { status: 500 });
        }

        return new Response(JSON.stringify(buildResponse), { status: 200 });
    }

    buildResponse.status = "error";
    buildResponse.message = "Bad request (but this should not happen).";
    return new Response(null, { status: 400 });
};
