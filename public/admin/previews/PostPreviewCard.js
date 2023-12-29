const PostPreviewCard = ({ entry, widgetFor }) => {
    return h(
        "div",
        { style: { width: "100%" } },
        widgetFor("image"),
        h(
            "div",
            { style: { padding: "16px", width: "100%" } },
            h(
                "div",
                {
                    style: {
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "start",
                    },
                },
                h(
                    "div",
                    {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "baseline",
                            gap: "8px",
                        },
                    },
                    h("strong", { style: { fontSize: "24px" } }, entry.data.title),
                    h("span", { style: { fontSize: "16px" } }, entry.data.date),
                ),
                h(
                    "div",
                    {
                        style: {
                            backgroundColor: entry.data.draft === true ? "blue" : "green",
                            color: "white",
                            border: "none",
                            padding: "4px 8px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            cursor: "pointer",
                            borderRadius: "4px",
                        },
                    },
                    entry.data.draft === true ? "Draft" : "Published",
                ),
            ),
        ),
    );
};

export default PostPreviewCard;
