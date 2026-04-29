"use client";

import { Payment01Icon, UserGroupIcon, RunningShoesIcon } from "hugeicons-react";
import { MetricCard } from "@/components/common";
import { useStats } from "@/hooks";
import type { StatItemMock } from "@/mocks";

const STAT_TREND_MAP: Record<string, "up" | "down" | "stable"> = {
  up: "up",
  down: "down",
  stable: "stable",
};

const STAT_ICONS: Record<string, React.ReactNode> = {
  "stat-001": <Payment01Icon size={20} />,
  "stat-002": <UserGroupIcon size={20} />,
  "stat-003": <RunningShoesIcon size={20} />,
};

export function StatsGrid() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-36 rounded-lg bg-surface-container border border-outline-variant/30 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
      {stats.map((stat: StatItemMock, index: number) => (
        <MetricCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          trend={STAT_TREND_MAP[stat.trend]}
          trendValue={stat.trendValue}
          trendDescription={stat.trendDescription}
          icon={STAT_ICONS[stat.id]}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
