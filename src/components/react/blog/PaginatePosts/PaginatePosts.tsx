import { getBlogPostSlug } from "@i18n/utils";
import type { CollectionEntry } from "astro:content";
import { getRelativeLocaleUrl } from "astro:i18n";
import { useEffect, useState } from "react";
import BlogPostPreview from "@components/react/blog/BlogPostPreview/BlogPostPreview";
import "./PaginatePosts.css";
import { navigate } from "astro:transitions/client";

interface PaginatePostsProps {
    data: CollectionEntry<"posts">[];
    itemsPerPage: number;
    locale: string;
}

const PaginatePosts = ({ data, itemsPerPage, locale }: PaginatePostsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const hash = window.location.hash;

    const getPageFromHash = (hash: string) => {
        return hash.substring(hash.indexOf("=") + 1, hash.length);
    };

    const createPageHash = (page: number) => {
        return `page=${page}`;
    };

    const checkCurrentHash = () => {
        if (hash !== "") {
            const pageNumber = Number(getPageFromHash(hash));
            setCurrentPage(pageNumber);
        }
    };

    useEffect(() => {
        checkCurrentHash();
    }, [checkCurrentHash]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        window.location.hash = createPageHash(pageNumber);
        setCurrentPage(pageNumber);
    };

    return (
        <div className="paginated-posts">
            <p>Current parameter: {getPageFromHash(hash)}</p>
            <ul className="post-list">
                {currentItems.map((item, index) => (
                    <li key={item.id}>
                        <BlogPostPreview post={item} url={getRelativeLocaleUrl(locale, `/blog/posts/${getBlogPostSlug(item.slug)}/`)} />
                    </li>
                ))}
            </ul>
            <div>
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((item, index) => (
                    <button className="button" key={index} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PaginatePosts;
