import { getEntry } from "astro:content";
import { locales } from "@i18n-config";
import { getRoutingLocale } from "@i18n/utils";
import { createResumePdfFilename } from "@utils";
import type { APIRoute } from "astro";
import { experimental_AstroContainer } from "astro/container";
import htmlToPdfMake from "html-to-pdfmake";
import jsdom from "jsdom";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export async function getStaticPaths() {
	const paths = locales.map((locale) => {
		const filename = createResumePdfFilename(locale);
		return { params: { lang: getRoutingLocale(locale), filename: filename } };
	});

	return paths;
}


export const GET: APIRoute = async ({ params }) => {
	if (!params.lang) {
		return new Response(null, { status: 401 });
	}

	const container = await experimental_AstroContainer.create();
	const entry = await getEntry("resume", params.lang);

	if (!entry) {
		return new Response(null, { status: 500 });
	}
	const { Content } = await entry.render();

	const content = await container.renderToString(Content);

	const { JSDOM } = jsdom;
	const { window } = new JSDOM("");
	pdfMake.vfs = pdfFonts.pdfMake.vfs;

	const html = htmlToPdfMake(content, {
		window,
	});
	
	const docDefinition = {
		content: [html],
		styles: {
			"html-h1": {
				marginTop: 25,
			},
		},
		defaultStyle: {
			fontSize: 11,
		},
	};

	let headers = {
		"Content-Type": "application/pdf",
		"Content-Disposition": `attachment; filename="${params.filename}.pdf"`,
	};

	const pdfDocGenerator = pdfMake.createPdf(docDefinition);

	const getPdfBuffer = () => {
		return new Promise((resolve) => {
			pdfDocGenerator.getBuffer((buffer) => {
				resolve(buffer);
			});
		});
	};

	try {
		const buffer = await getPdfBuffer();
		return new Response(buffer as Buffer, { status: 200, headers });
	} catch (error) {
		return new Response(null, { status: 500 });
	}
};
