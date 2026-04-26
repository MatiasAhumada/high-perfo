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
import type { ForceVelocityPointMock } from "@/mocks";

interface ForceVelocityCurveProps {
  data: ForceVelocityPointMock[];
}

const TOOLTIP_STYLE: React.CSSProperties = {
  backgroundColor: "#1d2023",
  border: "1px solid #46464c",
  borderRadius: "8px",
  color: "#e0e2e6",
  fontSize: "13px",
  padding: "8px 12px",
  fontFamily: "Space Grotesk, sans-serif",
};

export function ForceVelocityCurve({ data }: ForceVelocityCurveProps) {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 16, left: -16, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#46464c" vertical={false} opacity={0.15} />
          <XAxis
            dataKey="velocity"
            tick={{ fill: "#919096", fontSize: 12 }}
            axisLine={{ stroke: "#46464c" }}
            tickLine={false}
            label={{ value: "Velocidad (m/s)", position: "insideBottomRight", offset: -4, fill: "#919096", fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: "#919096", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label={{ value: "Fuerza (N)", angle: -90, position: "insideTopLeft", offset: 8, fill: "#919096", fontSize: 11 }}
            domain={[0, "dataMax + 200"]}
          />
          <Tooltip contentStyle={TOOLTIP_STYLE} />
          <Line
            type="monotone"
            dataKey="theoreticalForce"
            stroke="#c2c6d7"
            strokeWidth={1.5}
            strokeDasharray="8 4"
            dot={false}
            name="Teórica"
          />
          <Line
            type="monotone"
            dataKey="force"
            stroke="#f8171a"
            strokeWidth={2.5}
            dot={{ fill: "#f8171a", r: 3, strokeWidth: 0 }}
            activeDot={{ fill: "#f8171a", r: 6, stroke: "#f8171a", strokeWidth: 2, strokeOpacity: 0.3 }}
            name="Actual"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
