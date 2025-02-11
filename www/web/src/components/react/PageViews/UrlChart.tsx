import * as m from "@daliborhon.dev/integrations/i18n/messages";
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
				x={x + 5}
				y={y + 22}
				fontSize={17}
				textAnchor="start"
				style={{
					color: "transparent",
					fill: "var(--color-base-content)",
				}}
			>
				{value}
			</text>
		);
	};

	return (
		<div className="mt-4">
			{data.length === 0 && <p>{m.error__not_found_description()}.</p>}
			{data.length !== 0 && (
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
							cursor={{ fill: "var(--color-base-300)", strokeWidth: 1 }}
							wrapperStyle={{ maxWidth: "300px" }}
							labelStyle={{ textWrap: "balance" }}
							contentStyle={{ backgroundColor: "var(--color-base-300)" }}
						/>
						<Bar label={false} dataKey="pageviews" fill="var(--color-primary)" radius={[4, 4, 4, 4]}>
							<LabelList dataKey="url" position="insideLeft" content={({ x, y, value }: any) => <CustomLabel x={x} y={y} value={value} />} />
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			)}
		</div>
	);
}
