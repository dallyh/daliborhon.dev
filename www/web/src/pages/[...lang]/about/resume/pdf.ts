import { loadRenderers } from "astro:container";
import { getEntry, render } from "astro:content";
import { getContainerRenderer as mdxContainerRenderer } from "@astrojs/mdx";
import { Logger } from "@daliborhon.dev/integrations";
import type { AllowedLocales } from "@daliborhon.dev/integrations/i18n";
import * as m from "@daliborhon.dev/integrations/i18n/messages";
import { createResumePdfFilename } from "@utils";
import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import htmlToPdfMake from "html-to-pdfmake";
import jsdom from "jsdom";
import PdfPrinter from "pdfmake";
import type { Content, ContentImage, TDocumentDefinitions } from "pdfmake/interfaces";
import { WritableStreamBuffer } from "stream-buffers";
import { generateTOCHTML } from "@utils/content";

const logger = new Logger("pdf.ts");

// This cannot be prerendered, because the images are written last in the build step
export const prerender = false;

function updateAllIMGNodes(content: Content[] | Content): void {
	function isContentImage(node: any): node is ContentImage {
		return node && typeof node === "object" && node.nodeName === "IMG" && typeof node.image === "string";
	}

	function getDecodedSrc(imageUrl: string): string | null {
		// Example: /_image?href=/_astro/me.BN5ISb12.png&w=541&h=574&f=webp
		if (imageUrl.split("?").length > 0) {
			const queryParams = new URLSearchParams(imageUrl.split("?")[1]);
			const href = queryParams.get("href");
			return href ? decodeURIComponent(href) : null;
		}

		// Example: /assets/uploads/company-logos/abbyy.png
		return imageUrl;
	}

	function getCleanedSrc(imageUrl: string | null): string | null {
		if (!imageUrl) {
			return null;
		}

		if (import.meta.env.DEV) {
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

			throw new Error(`Could not determine local image path for: ${imageUrl}`);
		} else {
			return `/dist/client${imageUrl}`; // Build output and asset path in config
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

	const { Content, headings } = await render(entry);
	const toc = generateTOCHTML(headings);

	const content = await container.renderToString(Content, {
		partial: true,
		locals: {
			isPrint: true,
		},
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

	const html = htmlToPdfMake(toc + content, {
		window,
		removeExtraBlanks: true,
	});

	const currentDate = new Date();

	const docDefinition: TDocumentDefinitions = {
		content: [
			{
				text: m.blog__toc(),
				style: "header",
				marginBottom: 10,
			},
			html,
		],
		footer: function (currentPage, pageCount) {
			return {
				columns: [
					{ text: `${m.common__resume()} - Dalibor Hon (${currentDate.toLocaleString()})`, alignment: "left", style: "footer", marginLeft: 38 },
					{ text: `${currentPage.toString()}/${pageCount}`, alignment: "right", style: "footer", marginRight: 38 },
				],
			};
		},
		styles: {
			"html-h1": {
				marginTop: 10,
			},
			header: {
				fontSize: 18,
				bold: true,
			},
			footer: {
				fontSize: 8,
				opacity: 0.8,
				marginTop: 15,
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
		"Content-Disposition": `attachment; filename="${createResumePdfFilename(params.lang as AllowedLocales)}.pdf"`,
		"x-filename": `${createResumePdfFilename(params.lang as AllowedLocales)}.pdf`,
	};

	const printer = new PdfPrinter(fonts);

	async function generatePdfResponse(docDefinition: any): Promise<Buffer> {
		const bufferStream = new WritableStreamBuffer();

		return new Promise<Buffer>((resolve, reject) => {
			try {
				const pdfMake = printer.createPdfKitDocument(docDefinition);
				pdfMake.pipe(bufferStream);
				pdfMake.end();

				// Wait for the "finish" event to get the PDF buffer
				bufferStream.on("finish", () => {
					const pdfBuffer = bufferStream.getContents();

					if (!pdfBuffer) {
						return reject(new Error("Failed to generate PDF buffer"));
					}

					resolve(pdfBuffer as Buffer);
				});

				// Handle stream errors
				bufferStream.on("error", (err: Error) => {
					reject(new Error(`Buffer stream error: ${err.message}`));
				});
			} catch (error: any) {
				reject(new Error(`Failed to generate PDF: ${error}`));
			}
		});
	}

	try {
		const pdf = await generatePdfResponse(docDefinition);
		return new Response(pdf, { status: 200, headers: headers });
	} catch (error: any) {
		logger.error(`Fatal error: ${error}`);
		return new Response(null, { status: 500 });
	}
};
