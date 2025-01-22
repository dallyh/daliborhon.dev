import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type UrlChartProps = {
	data: {
		url: string;
		pageviews: number;
	}[];
};

export default function UrlChart({ data }: UrlChartProps) {
	const CustomLabel = ({ x, y, value }: any) => {
		return (
			<text
				x={x + 5} // Adjust text position
				y={y + 22}
				fontSize={17}
				textAnchor="start"
				style={{
					mixBlendMode: "difference",
					color: "transparent",
					fontWeight: "lighter",
					fill: "white",
				}}
			>
				{value}
			</text>
		);
	};

	return (
		<ResponsiveContainer height={data.length * 50}>
			<BarChart
				margin={{
					top: 10,
					right: 0,
					left: -58,
					bottom: 0,
				}}
				layout="vertical"
				data={data}
			>
				<YAxis type="category" dataKey="url" stroke="#FF0000" fontSize={12} tickLine={false} axisLine={false} tick={false} />
				<XAxis type="number" hide />
				<Tooltip
					cursor={{ fill: "oklch(var(--p))", strokeWidth: 1 }}
					wrapperStyle={{ maxWidth: "300px" }}
					labelStyle={{ textWrap: "balance" }}
					contentStyle={{ backgroundColor: "oklch(var(--B))" }}
				/>
				<Bar label={false} dataKey="pageviews" fill="oklch(var(--p))" radius={[4, 4, 4, 4]}>
					<LabelList dataKey="url" position="insideLeft" content={({ x, y, value }: any) => <CustomLabel x={x} y={y} value={value} />} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}
