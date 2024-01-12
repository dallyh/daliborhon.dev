import { t, loadNamespaces } from "@i18n/i18n";

export default async (locale: string) => {
    await loadNamespaces(locale, ["common"]);
    return (
        <div
            style={{
                display: "flex",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                color: "white",
                background: "rgba(30, 41, 59, 1)",
                backgroundSize: "30px 30px",
                backgroundImage: "linear-gradient(to right, rgba(14, 165, 233, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 165, 233, 0.06) 1px, transparent 1px)",
            }}
        >
            <div
                style={{
                    left: 32,
                    top: 42,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(to right, rgba(14, 165, 233, 1), rgb(34, 211, 238, 1))",
                    backgroundClip: "text",
                    color: "transparent",
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="rgba(14, 165, 233, 1)" viewBox="0 0 16 16" style={{ marginTop: 8 }}>
                    <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                </svg>
                <span
                    style={{
                        marginLeft: 8,
                        fontSize: 30,
                    }}
                >
                    daliborhon.dev
                </span>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px 50px",
                    margin: "0 42px",
                    fontSize: 60,
                    width: "auto",
                    maxWidth: 1000,
                    textAlign: "center",
                    backgroundColor: "rgba(15, 23, 42, 1)",
                    color: "white",
                    lineHeight: 1.4,
                    borderRadius: "10px",
                    boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.4)",
                }}
            >
                <p
                    style={{
                        margin: 0,
                    }}
                >
                    Dalibor Hon
                </p>
                <p
                    style={{
                        marginTop: "20px",
                        marginBottom: 0,
                        fontSize: 35,
                    }}
                >
                    {t("common.site_description")}
                </p>
            </div>
        </div>
    );
};
