"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface TrendLineProps {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
}

const TOOLTIP_STYLE = {
  backgroundColor: "#1d2023",
  border: "1px solid #46464c",
  borderRadius: "8px",
  color: "#e0e2e6",
  fontSize: "13px",
  padding: "8px 12px",
};

export function TrendLine({
  data,
  color = "#f8171a",
  height = 120,
}: TrendLineProps) {
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#46464c"
            vertical={false}
            opacity={0.15}
          />
          <XAxis dataKey="label" hide />
          <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
