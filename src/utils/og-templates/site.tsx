import { loadNamespaces, t } from "@i18n/i18n";
import { getCollection } from "astro:content";

export default async (locale: string) => {
    await loadNamespaces(locale, ["common"]);
    const posts = await getCollection("posts", ({ data }) => {
        return !data.hidden && data.language === locale;
    });

    const projects = await getCollection("projects", ({ data }) => {
        return data.language === locale;
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                alignItems: "center",
                background: "transparent",
                justifyContent: "center",
                fontFamily: 'Inter, "Material Icons"',
                color: "white",
                padding: "0px",
            }}
        >
            <div
                style={{
                    background: "#1d1e22",
                    height: "100%",
                    width: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0px 3px 30px 1px rgba(0,0,0,0.6)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.4)",
                        padding: "19px",
                        position: "relative",
                    }}
                >
                    <div style={{ display: "flex" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                        </svg>
                    </div>
                    <div style={{ position: "absolute", textAlign: "center", left: "600px", top: "50%", transform: "translateX(-50%)", fontSize: 28, fontWeight: 700, letterSpacing: "1px" }}>
                        https://daliborhon.dev
                    </div>
                    <div style={{ display: "flex" }}>
                        <div style={{ borderRadius: "50%", width: 24, height: 24, background: "rgb(90,220,90) ", marginRight: 10 }}></div>
                        <div style={{ borderRadius: "50%", width: 24, height: 24, background: "rgb(255,200,90)", marginRight: 10 }}></div>
                        <div style={{ borderRadius: "50%", width: 24, height: 24, background: "rgb(255,90,90)" }}></div>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0 20px 0 20px",
                        flexShrink: "1",
                        overflow: "hidden",
                    }}
                >
                    <p style={{ fontSize: "60px", fontWeight: "700" }}>Dalibor Hon</p>
                    <p style={{ fontSize: "40px" }}>{t("common.site_description")}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", borderTop: "1px solid rgba(255, 255, 255, 0.4)", padding: "10px 20px 10px 20px", width: "100%", marginTop: "auto" }}>
                    <div style={{ display: "flex", fontSize: 24, fontWeight: "700" }}>
                        {t("blog.posts")}: {posts.length === 0 ? "None :(" : posts.length} | {t("projects.projects")}: {projects.length === 0 ? "None :(" : projects.length}
                    </div>
                </div>
            </div>
        </div>
    );
};
