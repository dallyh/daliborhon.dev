import { slugifyStr } from "@utils";
import type { HeadingNode } from "./types";

export function generateTableOfContents(headings: HeadingNode[], maxDepth: number | undefined) {
    let tocHtml = "<ol>";
    let currentLevel = 1;

    headings.forEach((heading: HeadingNode) => {
        if (maxDepth && heading.attrs.level > maxDepth) {
            return;
        }

        if (heading.attrs.level > currentLevel) {
            tocHtml += "<ol>";
        } else if (heading.attrs.level < currentLevel) {
            tocHtml += "</ol>".repeat(currentLevel - heading.attrs.level);
        }

        currentLevel = heading.attrs.level;
        tocHtml += `<li><a href="#${slugifyStr(undefined, heading.content[0].text)}" title="${heading.content[0].text}">${heading.content[0].text}</a></li>`;
    });

    tocHtml += "</ol>".repeat(currentLevel);

    return tocHtml;
}
