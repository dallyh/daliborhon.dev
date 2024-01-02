import CMS, { type FieldPreviewProps, type TemplatePreviewCardProps } from "@staticcms/core";
import { useEffect, useMemo } from "react";
import "@staticcms/core/dist/main.css";
import { config } from "./config";
import type { FC } from "react";
import React from "react";
import { createRoot } from "react-dom/client";

const PostDraftFieldPreview: React.FC<FieldPreviewProps> = ({ value }) => {
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
            {value === true ? "Draft" : "Published"}
        </div>
    );
};

interface PostPreviewCardProps {
    image: string;
    title: string;
    body: string;
    date: string;
    draft: boolean;
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
                            backgroundColor: entry.data?.draft === true ? "blue" : "green",
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
                        {entry.data?.draft === true ? "Draft" : "Published"}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CmsAdmin: FC = () => {
    useEffect(() => {
        if (import.meta.env.MODE === "development") {
            config.local_backend = true;
        }

        CMS.registerPreviewCard("posts", PostPreviewCard, () => 240);
        CMS.registerFieldPreview("posts", "draft", PostDraftFieldPreview);

        CMS.init({ config });
    }, []);

    return (
        <>
            <div />
        </>
    );
};

const Admin: FC = () => {
    return useMemo(() => <CmsAdmin key="admin" />, [CmsAdmin]);
};

export default Admin;
