import { QueryClient, useQuery, keepPreviousData } from "@tanstack/react-query";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { ActivityCalendar, type ThemeInput, type Activity } from "react-activity-calendar";

const gitHubTheme = {
	light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
	dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
} satisfies ThemeInput;

const queryClient = new QueryClient();
type Theme = "dark" | "light";

export default function GitHubCalendar() {
	const [loading, setIsLoading] = useState(true);
	const [theme, setTheme] = useState<Theme>("light");

	// Create a ref for the Calendar component
	const calendarRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const theme = document.documentElement.dataset.theme ?? "light";
		setTheme(theme as Theme);

		window.addEventListener("theme-changed", () => {
			const theme = document.documentElement.dataset.theme ?? "light";
			setTheme(theme as Theme);
		});

		setIsLoading(false);
	}, []);

	const { data, isPending } = useQuery(
		{
			queryKey: ["contributions"],
			placeholderData: keepPreviousData,
			queryFn: async () => {
				const response = await fetch(`https://github-contributions-api.jogruber.de/v4/dallyh?y=last`);
				const data = await response.json();
				return data.contributions as Array<Activity>;
			},
		},
		queryClient,
	);

	return (
		<>
			<ActivityCalendar
				ref={calendarRef}
				weekStart={1}
				labels={
					{
						//totalCount: "{{count}} contributions in the last half year",
					}
				}
				loading={loading || isPending}
				theme={gitHubTheme}
				data={data!}
				colorScheme={theme}
			/>
		</>
	);
}
