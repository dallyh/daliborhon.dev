import type { CollectionEntry } from "astro:content";
import "./BlogPostPreview.css";

interface BlogPostPreviewProps {
    post: CollectionEntry<"posts">;
    url: string;
}

const BlogPostPreview = ({ post, url }: BlogPostPreviewProps) => {
    return (
        <div className="post-preview">
            <img src={post.data.image.url} width="300" alt={post.data.image.alt} />
            <div className="post-description">
                <a href={url} className="post-title">
                    {post.data.title}
                </a>
                <p>Written by {post.data.author}</p>
                <p>Published on: {post.data.pubDate.toDateString()}</p>
            </div>
        </div>
    );
};

export default BlogPostPreview;
