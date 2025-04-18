// Adapted from: https://www.thomasledoux.be/blog/basic-analytics-vercel-postgres-astro
import type { Locale } from "@paraglide/runtime";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ViewChartProps = {
	data: [date: string, pageViewNumber: number][];
	locale: Locale;
};

export default function ViewChart({ data, locale }: ViewChartProps) {
	return (
		<ResponsiveContainer height={400}>
			<AreaChart
				width={500}
				height={400}
				data={data.map((el) => ({
					...el,
					day: new Date(el[0]).toLocaleDateString(locale, {
						month: "short",
						day: "numeric",
					}),
					page_views_count: +el[1],
				}))}
				margin={{
					top: 10,
					right: 0,
					left: -36,
					bottom: 0,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="day" />
				<YAxis />
				<Tooltip contentStyle={{ backgroundColor: "var(--color-base-300)" }} />
				<Area type="monotone" dataKey="page_views_count" stroke="var(--color-primary)" fill="var(--color-primary)" />
			</AreaChart>
		</ResponsiveContainer>
	);
}
