import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type UrlChartProps = {
	data: {
		url: string;
		pageviews: number;
	}[];
};

const UrlChart = ({ data }: UrlChartProps) => {
	const CustomLabel = ({ x, y, value }: any) => {
		return (
			<text
				x={x + 5} // Adjust text position
				y={y + 20}
				fontSize={14}
				textAnchor="start"
				style={{
					mixBlendMode: "difference", // Dynamically invert colors
					fill: "white", // Default color that works with mix-blend-mode
				}}
			>
				{value}
			</text>
		);
	};

	return (
		<ResponsiveContainer width="100%" height={data.length * 50} style={{ marginLeft: "-4rem" }}>
			<BarChart layout="vertical" data={data}>
				<YAxis type="category" dataKey="url" stroke="#FF0000" fontSize={12} tickLine={false} axisLine={false} tick={false} />
				<XAxis type="number" hide />
				<Tooltip wrapperStyle={{ maxWidth: "300px" }} labelStyle={{ textWrap: "balance" }} />
				<Bar label={false} dataKey="pageviews" fill="var(--bulma-primary)" radius={[4, 4, 4, 4]}>
					<LabelList dataKey="url" position="insideLeft" content={({ x, y, value }: any) => <CustomLabel x={x} y={y} value={value} />} />
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default UrlChart;
