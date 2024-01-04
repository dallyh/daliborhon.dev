import CMS, { type FieldPreviewProps, type TemplatePreviewCardProps } from "@staticcms/core";
import { useEffect, useMemo } from "react";
import "@staticcms/core/dist/main.css";
import { getCmsConfig } from "./config";
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

const CmsAdmin: FC = () => {
    useEffect(() => {
        const config = getCmsConfig();

        CMS.registerPreviewCard("posts", PostPreviewCard, () => 240);
        CMS.registerFieldPreview("posts", "hidden", PostHiddenFieldPreview);
        
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
