import { keepPreviousData, QueryClient, useQuery } from "@tanstack/react-query";
import { Logger } from "@utils";
import { useEffect, useState } from "react";

type Status = "up" | "down" | undefined;

const cls = {
	up: "status-success",
	down: "status-error",
};

const queryClient = new QueryClient();
const logger = new Logger("uptime-status");

const fetchStatus = async (): Promise<Status> => {
	const res = await fetch(`/api/bs-status`);
	const data = await res.json();
	return data.status;
};

export default function UptimeStatus() {
	const [isLoading, setIsLoading] = useState(true);

	const { isPending, data, isError, error } = useQuery(
		{
			queryKey: ["uptimeStatus"],
			placeholderData: keepPreviousData,
			queryFn: fetchStatus,
			refetchInterval: 180_000,
		},
		queryClient,
	);

	// Prevent hydration errors
	useEffect(()=> {
		setIsLoading(isPending);
	},[isPending])

	if (isError || error) {
		logger.error("Failed to fetch status: " + error);
		return;
	}

	return (
		<a className="inline-grid *:[grid-area:1/1]" target="_blank" href="https://status.daliborhon.dev">
			<div className={`status ${isLoading ? "" : cls[data ?? "down"]} animate-ping`}></div>
			<div className={`status ${isLoading ? "" : cls[data ?? "down"]}`}></div>
		</a>
	);
}
