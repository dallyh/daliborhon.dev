import { OA_ALLOWED_DOMAINS, OA_GITHUB_CLIENT_ID, OA_GITHUB_CLIENT_SECRET } from "astro:env/server";

// Taken from https://github.com/sveltia/sveltia-cms-auth

const supportedProviders = ["github"];
const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

type OutputHtmlProps = {
	provider?: string;
	token?: string;
	error?: string;
	errorCode?: string;
};

const outputHTML = ({ provider = "unknown", token, error, errorCode }: OutputHtmlProps) => {
	const state = error ? "error" : "success";
	const content = error ? { provider, error, errorCode } : { provider, token };

	return new Response(
		`
		<!doctype html>
		<html>
			<body>
				<script>
				(() => {
					window.addEventListener('message', ({ data, origin }) => {
					if (data === 'authorizing:${provider}') {
						window.opener?.postMessage(
						'authorization:${provider}:${state}:${JSON.stringify(content)}',
						origin
						);
					}
					});
					window.opener?.postMessage('authorizing:${provider}', '*');
				})();
				</script>
				<pre>${JSON.stringify(content, null, 2)}</pre>
			</body>
		</html>
	  `,
		{
			headers: {
				"Content-Type": "text/html;charset=UTF-8",
				// Delete CSRF token
				"Set-Cookie": `csrf-token=deleted; HttpOnly; Max-Age=0; Path=/; SameSite=Lax; Secure`,
			},
		},
	);
};

const handleAuth = async (request: Request) => {
	const { url } = request;
	const { searchParams } = new URL(url);
	const { provider, site_id: domain } = Object.fromEntries(searchParams);

	if (searchParams.size === 0) {
		return outputHTML({
			error: "Invalid parameters.",
			errorCode: "INVALID_URL_PARAMS",
		});
	}

	if (!provider || !supportedProviders.includes(provider)) {
		return outputHTML({
			error: "Your Git backend is not supported by the authenticator.",
			errorCode: "UNSUPPORTED_BACKEND",
		});
	}

	// Check if the domain is whitelisted
	if (
		OA_ALLOWED_DOMAINS &&
		!OA_ALLOWED_DOMAINS.split(/,/).some((str: string) =>
			// Escape the input, then replace a wildcard for regex
			(domain ?? "").match(new RegExp(`^${escapeRegExp(str.trim()).replace("\\*", ".+")}$`)),
		)
	) {
		return outputHTML({
			provider,
			error: "Your domain is not allowed to use the authenticator.",
			errorCode: "UNSUPPORTED_DOMAIN",
		});
	}

	// Generate a random string for CSRF protection
	const csrfToken = globalThis.crypto.randomUUID().replaceAll("-", "");
	let authURL = "";

	// GitHub
	if (provider === "github") {
		if (!OA_GITHUB_CLIENT_ID || !OA_GITHUB_CLIENT_SECRET) {
			return outputHTML({
				provider,
				error: "OAuth app client ID or secret is not configured.",
				errorCode: "MISCONFIGURED_CLIENT",
			});
		}

		const params = new URLSearchParams({
			client_id: OA_GITHUB_CLIENT_ID,
			scope: "repo,user",
			state: csrfToken,
		});

		authURL = `https://github.com/login/oauth/authorize?${params.toString()}`;
	}

	// Redirect to the authorization server
	return new Response(null, {
		status: 302,
		headers: {
			Location: authURL,
			// Cookie expires in 10 minutes; Use `SameSite=Lax` to make sure the cookie is sent by the
			// browser after redirect
			"Set-Cookie": `csrf-token=${provider}_${csrfToken}; ` + `HttpOnly; Path=/; Max-Age=600; SameSite=Lax; Secure`,
		},
	});
};

const handleCallback = async (request: Request) => {
	const { url, headers } = request;
	const { searchParams } = new URL(url);
	const { code, state } = Object.fromEntries(searchParams);

	if (searchParams.size === 0) {
		return outputHTML({
			error: "Invalid parameters.",
			errorCode: "INVALID_URL_PARAMS",
		});
	}

	const [, provider, csrfToken] = headers.get("Cookie")?.match(/\bcsrf-token=([a-z-]+?)_([0-9a-f]{32})\b/) ?? [];

	if (!provider || !supportedProviders.includes(provider)) {
		return outputHTML({
			error: "Your Git backend is not supported by the authenticator.",
			errorCode: "UNSUPPORTED_BACKEND",
		});
	}

	if (!code || !state) {
		return outputHTML({
			provider,
			error: "Failed to receive an authorization code. Please try again later.",
			errorCode: "AUTH_CODE_REQUEST_FAILED",
		});
	}

	if (!csrfToken || state !== csrfToken) {
		return outputHTML({
			provider,
			error: "Potential CSRF attack detected. Authentication flow aborted.",
			errorCode: "CSRF_DETECTED",
		});
	}

	let tokenURL = "";
	let requestBody = {};

	// GitHub
	if (provider === "github") {
		if (!OA_GITHUB_CLIENT_ID || !OA_GITHUB_CLIENT_SECRET) {
			return outputHTML({
				provider,
				error: "OAuth app client ID or secret is not configured.",
				errorCode: "MISCONFIGURED_CLIENT",
			});
		}

		tokenURL = `https://github.com/login/oauth/access_token`;
		requestBody = {
			code,
			client_id: OA_GITHUB_CLIENT_ID,
			client_secret: OA_GITHUB_CLIENT_SECRET,
		};
	}

	let response;
	let token = "";
	let error = "";

	try {
		response = await fetch(tokenURL, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});
	} catch {
		//
	}

	if (!response) {
		return outputHTML({
			provider,
			error: "Failed to request an access token. Please try again later.",
			errorCode: "TOKEN_REQUEST_FAILED",
		});
	}

	try {
		({ access_token: token, error } = await response.json());
	} catch {
		return outputHTML({
			provider,
			error: "Server responded with malformed data. Please try again later.",
			errorCode: "MALFORMED_RESPONSE",
		});
	}

	return outputHTML({ provider, token, error });
};

export { handleAuth, handleCallback };
