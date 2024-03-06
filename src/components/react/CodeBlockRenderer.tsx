import React from "react";
import { Highlight, themes, type PrismTheme } from "prism-react-renderer";
import "prismjs/themes/prism-okaidia.css"; // Importing the Prism theme CSS

export interface CodeBlockRendererProps {
    code: string;
    theme: PrismTheme;
    lang: string;
}

const CodeBlockRenderer = ({ code, lang, theme = themes.dracula }: CodeBlockRendererProps) => {
    return (
        <Highlight theme={theme} code={code} language={lang}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                            <span>{i + 1}</span>
                            {line.map((token, key) => (
                                <span key={key} {...getTokenProps({ token })} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};

export default CodeBlockRenderer;
