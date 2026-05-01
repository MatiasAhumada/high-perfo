"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { SessionDataMock } from "@/mocks";

interface SessionBarChartProps {
  data: SessionDataMock[];
  activeMetric?: "sj" | "cmj" | "dj";
}

const METRIC_COLORS: Record<string, { bar: string; active: string }> = {
  sj: { bar: "#c2c6d7", active: "#f8171a" },
  cmj: { bar: "#c2c6d7", active: "#f8171a" },
  dj: { bar: "#c2c6d7", active: "#f8171a" },
};

const TOOLTIP_STYLE: React.CSSProperties = {
  backgroundColor: "#1d2023",
  border: "1px solid #46464c",
  borderRadius: "8px",
  color: "#e0e2e6",
  fontSize: "13px",
  padding: "8px 12px",
  fontFamily: "Space Grotesk, sans-serif",
};

export function SessionBarChart({
  data,
  activeMetric = "sj",
}: SessionBarChartProps) {
  const colors = METRIC_COLORS[activeMetric];
  const lastIndex = data.length - 1;

  return (
    <div className="w-full h-[200px] sm:h-[250px] lg:h-[280px] bg-surface-container-low rounded-lg p-3 sm:p-4 border border-outline-variant/20">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap="20%"
          margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#46464c"
            vertical={false}
            opacity={0.15}
          />
          <XAxis
            dataKey="label"
            tick={{ fill: "#919096", fontSize: 11 }}
            axisLine={{ stroke: "#46464c" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#919096", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            domain={["dataMin - 3", "dataMax + 3"]}
          />
          <Tooltip
            contentStyle={TOOLTIP_STYLE}
            cursor={{ fill: "#272a2d", opacity: 0.5 }}
          />
          <Bar dataKey={activeMetric} radius={[4, 4, 0, 0]} strokeWidth={0}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === lastIndex ? colors.active : colors.bar}
                opacity={index === lastIndex ? 1 : 0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
