const PostDraftFieldPreview = ({ value }) => {
    return h(
        "div",
        {
            style: {
                backgroundColor: value === true ? "rgb(37 99 235)" : "rgb(22 163 74)",
                color: "white",
                border: "none",
                padding: "2px 6px",
                textAlign: "center",
                textDecoration: "none",
                display: "inline-block",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "14px",
            },
        },
        value === true ? "Draft" : "Published",
    );
};

export default PostDraftFieldPreview;