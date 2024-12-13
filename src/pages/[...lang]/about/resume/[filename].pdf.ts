import { loadRenderers } from "astro:container";
import { getEntry, render } from "astro:content";
import { getContainerRenderer as mdxContainerRenderer } from "@astrojs/mdx";
import { locales } from "@i18n-config";
import { getRoutingLocale } from "@i18n/utils";
import { createResumePdfFilename } from "@utils";
import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import htmlToPdfMake from "html-to-pdfmake";
import jsdom from "jsdom";
import PdfPrinter from "pdfmake";
import type { Content, ContentImage, TDocumentDefinitions } from "pdfmake/interfaces";
import { WritableStreamBuffer } from "stream-buffers";

// Prerender so it does not take server resources on download
export async function getStaticPaths() {
	const paths = locales.map((locale) => {
		const filename = createResumePdfFilename(locale);
		return { params: { lang: getRoutingLocale(locale), filename: filename } };
	});

	return paths;
}

function updateAllIMGNodes(content: Content[] | Content): void {
	function isContentImage(node: any): node is ContentImage {
		return node && typeof node === "object" && node.nodeName === "IMG" && typeof node.image === "string";
	}

	function getDecodedSrc(imageUrl: string): string | null {
		const queryParams = new URLSearchParams(imageUrl.split("?")[1]);
		const href = queryParams.get("href");
		return href ? decodeURIComponent(href) : null;
	}

	function getCleanedSrc(imageUrl: string | null): string | null {
		if (!imageUrl) {
			return null;
		}

		try {
			// Remove query parameters
			const [path] = imageUrl.split("?");

			// Check for `/src/`
			let srcIndex = path.indexOf("/src/");
			if (srcIndex !== -1) {
				return path.substring(srcIndex + 1); // Remove the leading slash
			}

			// Check for `/public/`
			const publicIndex = path.indexOf("/public/");
			if (publicIndex !== -1) {
				return path.substring(publicIndex + 1);
			}

			return null; // Return null if neither `/src/` nor `/public/` is found
		} catch {
			return null; // Handle any unexpected errors gracefully
		}
	}

	function traverse(node: Content) {
		if (Array.isArray(node)) {
			node.forEach(traverse);
		} else if (typeof node === "object" && node !== null) {
			// If the node is an object, check for `nodeName: 'IMG'`
			if (isContentImage(node)) {
				// Decode and clean the "image" property
				const decodedSrc = getDecodedSrc(node.image);
				const cleanedSrc = getCleanedSrc(decodedSrc);
				const src = `./${cleanedSrc}`;
				if (cleanedSrc) {
					node.image = src;
				} else {
					node.image = "";
				}
			}

			// Traverse specific `pdfmake` content properties
			if (node.stack) {
				traverse(node.stack);
			}
			if (node.ul) {
				traverse(node.ul);
			}
			if (node.table) {
				traverse(node.table.body as Content);
			}
		}
	}
	traverse(content);
}

export const GET: APIRoute = async ({ params }) => {
	if (!params.lang) {
		return new Response(null, { status: 401 });
	}
	const renderers = await loadRenderers([mdxContainerRenderer()]);
	const container = await experimental_AstroContainer.create({
		renderers,
	});

	const entry = await getEntry("resume", params.lang);

	if (!entry) {
		return new Response(null, { status: 404 });
	}

	const { Content } = await render(entry);

	const content = await container.renderToString(Content, {
		partial: true,
		locals: {
			isPrint: true
		}
	});

	const { JSDOM } = jsdom;
	const { window } = new JSDOM("");

	var fonts = {
		Roboto: {
			normal: "./src/assets/fonts/Roboto-Regular.ttf",
			bold: "./src/assets/fonts/Roboto-Medium.ttf",
			italics: "./src/assets/fonts/Roboto-Italic.ttf",
			bolditalics: "./src/assets/fonts/Roboto-MediumItalic.ttf",
		},
	};

	const html = htmlToPdfMake(content, {
		window,
		removeExtraBlanks: true,
	});

	const docDefinition: TDocumentDefinitions = {
		content: [html],
		styles: {
			"html-h1": {
				marginTop: 10,
			},
		},
		defaultStyle: {
			fontSize: 11,
			font: "Roboto",
		},
	};

	updateAllIMGNodes(html);

	let headers = {
		"Content-Type": "application/pdf",
		"Content-Disposition": `attachment; filename="${params.filename}.pdf"`,
	};

	const printer = new PdfPrinter(fonts);

	async function generatePdfResponse(docDefinition: any): Promise<Response> {
		const bufferStream = new WritableStreamBuffer();

		return new Promise<Response>((resolve, reject) => {
			try {
				printer.createPdfKitDocument(docDefinition).pipe(bufferStream).end()

				// Wait for the "finish" event to get the PDF buffer
				bufferStream.on("finish", () => {
					const pdfBuffer = bufferStream.getContents();

					if (!pdfBuffer) {
						return reject(new Error("Failed to generate PDF buffer"));
					}

					resolve(
						new Response(pdfBuffer as Buffer, {
							status: 200,
							headers,
						}),
					);
				});

				// Handle stream errors
				bufferStream.on("error", (err: Error) => {
					reject(new Error(`Buffer stream error: ${err.message}`));
				});
			} catch (error: any) {
				reject(new Error(`Failed to generate PDF: ${error.message}`));
			}
		});
	}

	try {
		return await generatePdfResponse(docDefinition);
	} catch (error) {
		return new Response(null, { status: 500 });
	}
};
