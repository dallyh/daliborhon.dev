import { QueryClient, keepPreviousData, useQuery } from "@tanstack/react-query";
import { Logger } from "@daliborhon.dev/integrations";

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
	const { isPending, data, isError, error } = useQuery(
		{
			queryKey: ["uptimeStatus"],
			placeholderData: keepPreviousData,
			queryFn: fetchStatus,
			refetchInterval: 180_000,
		},
		queryClient,
	);

	if (isError || error) {
		logger.error("Failed to fetch status: " + error);
		return;
	}

	return (
		<a className="inline-grid *:[grid-area:1/1]" target="_blank" href="https://status.daliborhon.dev">
			<div className={`status ${isPending ? "" : cls[data ?? "down"]} animate-ping`}></div>
			<div className={`status ${isPending ? "" : cls[data ?? "down"]}`}></div>
		</a>
	);
}
