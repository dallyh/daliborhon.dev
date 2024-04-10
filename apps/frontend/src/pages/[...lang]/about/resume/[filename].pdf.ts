import type { APIRoute } from "astro";
import { mdToPdf } from "md-to-pdf";
import { locales } from "shared/frontend/i18n";
import { getRoutingLocale } from "@i18n/utils";
import { createResumePdfFilename } from "@utils";

export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        const filename = createResumePdfFilename(locale);
        return { params: { lang: getRoutingLocale(locale), filename: filename } };
    });

    return paths;
}

export const GET: APIRoute = async ({ params }) => {
    let headers = {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${params.filename}"`,
    };

    if (import.meta.env.DEV) {
        headers["Content-Disposition"] = "";
    }

    if (params.lang === "cs") {
        const content = await import("@content/resume/cs.md");
        const pdf = await mdToPdf({ content: content.rawContent() }, { document_title: params.filename });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    if (params.lang === "en") {
        const content = await import("@content/resume/en.md");
        const pdf = await mdToPdf({ content: content.rawContent() }, { document_title: params.filename });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    return new Response(null, { status: 404 });
};
