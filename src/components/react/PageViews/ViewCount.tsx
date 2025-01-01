import { QueryClient, useQuery } from "@tanstack/react-query";
import * as m from "$messages";
import { Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

type ViewCountProps = {
	url: string;
};

export default function ViewCount ({ url }: ViewCountProps) {
    const [isLoading, setIsLoading] = useState(true);
    
	const { data, isPending } = useQuery(
		{
			queryKey: ["viewCount", url],
			staleTime: 0, // No cache,
			gcTime: 0, // No cache
			queryFn: async () => {
				const response = await fetch(`/api/view-count?url=${url}`);
				const data = await response.json();
				await new Promise((res) => setTimeout(() => res(""), 3000));
				return data;
			},
		},
		queryClient,
	);

    // This is here to prevent client-side hydration errors, useQuery runs on the server.
	useEffect(() => {
		setIsLoading(isPending);
	}, [isPending]);

	return (
		<Fragment>
			<span>{m.common__view_count()}:</span>
			{isLoading && (
				<span className="is-skeleton" style={{ minWidth: 50 }}>
					0
				</span>
			)}

			{!isLoading && <span>{data.count}</span>}
		</Fragment>
	);
};
