import CMS, { type FieldPreviewProps, type TemplatePreviewCardProps } from "@staticcms/core";
import { useEffect } from "react";
import "@staticcms/core/dist/main.css";
import { createCmsConfig } from "@config/cms";
import type { FC } from "react";
import React from "react";

const PostHiddenFieldPreview: React.FC<FieldPreviewProps> = ({ value }) => {
    return (
        <div
            style={{
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
            }}
        >
            {value === true ? "Hidden" : "Visible"}
        </div>
    );
};

interface PostPreviewCardProps {
    image: string;
    title: string;
    body: string;
    date: string;
    hidden: boolean;
}

const PostPreviewCard: React.FC<TemplatePreviewCardProps<PostPreviewCardProps>> = ({ entry, widgetFor }) => {
    return (
        <div style={{ width: "100%" }}>
            {widgetFor("image")}
            <div style={{ padding: "16px", width: "100%" }}>
                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "start",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "baseline",
                            gap: "8px",
                        }}
                    >
                        <strong style={{ fontSize: "24px" }}>{entry.data?.title}</strong>
                        <span style={{ fontSize: "16px" }}>{entry.data?.date}</span>
                    </div>
                    <div
                        style={{
                            backgroundColor: entry.data?.hidden === true ? "blue" : "green",
                            color: "white",
                            border: "none",
                            padding: "4px 8px",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            cursor: "pointer",
                            borderRadius: "4px",
                        }}
                    >
                        {entry.data?.hidden === true ? "Hidden" : "Visible"}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TagIcon: FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586zm3.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
            <path d="M1.293 7.793A1 1 0 0 1 1 7.086V2a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l.043-.043z" />
        </svg>
    );
};

const CategoryIcon: FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
        </svg>
    );
};

const CmsAdmin: FC = () => {
    useEffect(() => {
        const config = createCmsConfig();

        CMS.registerPreviewCard("posts", PostPreviewCard, () => 240);
        CMS.registerFieldPreview("posts", "hidden", PostHiddenFieldPreview);
        CMS.registerIcon("tags", TagIcon);
        CMS.registerIcon("categories", CategoryIcon);

        CMS.init({ config });
    }, []);

    return (
        <>
            <div />
        </>
    );
};

export default CmsAdmin;
