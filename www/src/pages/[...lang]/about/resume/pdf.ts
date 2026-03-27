import { loadRenderers } from "astro:container";
import { getEntry, render } from "astro:content";
import { getContainerRenderer as mdxContainerRenderer } from "@astrojs/mdx";
import { Logger } from "@logger";
import { m } from "@paraglide/messages";
import type { Locale } from "@paraglide/runtime";
import { createResumePdfFilename } from "@utils";
import { generateTocHtml } from "@utils/content";
import type { APIRoute } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import htmlToPdfMake from "html-to-pdfmake";
import jsdom from "jsdom";
import pdfmake from "pdfmake";
import type { Content, ContentImage, TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces";

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

export const GET: APIRoute = async ({ params, url }) => {
	if (!params.lang) {
		return new Response(null, { status: 401 });
	}

	const renderers = await loadRenderers([mdxContainerRenderer()]);
	const container = await AstroContainer.create({
		renderers,
	});

	const entry = await getEntry("resume", params.lang);
	if (!entry) {
		return new Response(null, { status: 404 });
	}

	const { Content, headings } = await render(entry);
	const toc = generateTocHtml(headings);
	const content = await container.renderToString(Content, {
		partial: true,
		locals: {
			isPrint: true,
		},
	});

	const { JSDOM } = jsdom;
	const { window } = new JSDOM("");

	var fonts: TFontDictionary = {
		Nunito: {
			normal: "./src/assets/fonts/Nunito-Regular.ttf",
			bold: "./src/assets/fonts/Nunito-Medium.ttf",
			italics: "./src/assets/fonts/Nunito-Italic.ttf",
			bolditalics: "./src/assets/fonts/Nunito-MediumItalic.ttf",
		},
		Symbol: {
			normal: "Symbol",
		},
		ZapfDingbats: {
			normal: "ZapfDingbats",
		},
	};

	const pdfmakeDocument = htmlToPdfMake(toc + content, {
		window,
		removeExtraBlanks: true,
	}) as Content;
	updateAllIMGNodes(pdfmakeDocument);

	const currentDate = new Date();
	const docDefinition: TDocumentDefinitions = {
		content: [
			{
				text: m.blog__toc(),
				style: "header",
				marginBottom: 10,
			},
			pdfmakeDocument,
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
			font: "Nunito",
		},
	};

	if (url.searchParams.has("json")) {
		return new Response(JSON.stringify(docDefinition), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	}

	let headers = {
		"Content-Type": "application/pdf",
		"Content-Disposition": `attachment; filename="${createResumePdfFilename(params.lang as Locale)}.pdf"`,
		"x-filename": `${createResumePdfFilename(params.lang as Locale)}.pdf`,
	};

	pdfmake.addFonts(fonts);

	async function generatePdfBytes(docDefinition: any): Promise<Uint8Array> {
		try {
			const pdf = pdfmake.createPdf(docDefinition);
			const buffer = await pdf.getBuffer();

			if (!buffer) {
				throw new Error("Failed to generate PDF buffer");
			}

			return buffer;
		} catch (error: any) {
			throw new Error(`Failed to generate PDF: ${error?.message ?? error}`);
		}
	}

	try {
		const pdfBytes = await generatePdfBytes(docDefinition);
		return new Response(Buffer.from(pdfBytes), {
			status: 200,
			headers: headers
		});
	} catch (error: any) {
		logger.error(`Fatal error: ${error?.message ?? error}`);
		return new Response("Failed to generate PDF", { status: 500 });
	}
};
