"use client";

import { motion } from "framer-motion";
import { ArrowUp01Icon, ArrowDown01Icon, EqualSignIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";

type TrendDirection = "up" | "down" | "stable";

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: TrendDirection;
  trendValue?: string;
  trendDescription?: string;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

const TREND_CONFIG: Record<
  TrendDirection,
  {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    colorClass: string;
  }
> = {
  up: { icon: ArrowUp01Icon, colorClass: "text-[#4ade80]" },
  down: { icon: ArrowDown01Icon, colorClass: "text-on-tertiary-container" },
  stable: { icon: EqualSignIcon, colorClass: "text-secondary" },
};

export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  trendDescription,
  icon,
  className,
  delay = 0,
}: MetricCardProps) {
  const trendConfig = trend ? TREND_CONFIG[trend] : null;
  const TrendIcon = trendConfig?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/30 p-5 sm:p-6 group hover:border-outline-variant/60 transition-colors",
        className,
      )}
    >
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-on-tertiary-container/5 rounded-full blur-2xl group-hover:bg-on-tertiary-container/10 transition-colors pointer-events-none" />

      <div className="flex justify-between items-start mb-3 sm:mb-4 relative z-10">
        <p className="text-[10px] sm:text-xs text-on-surface-variant uppercase tracking-wider">
          {label}
        </p>
        {icon && <span className="text-on-tertiary-container">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-2 relative z-10">
        <span className="text-2xl sm:text-3xl lg:text-4xl font-display text-on-surface leading-none">
          {value}
        </span>
        {unit && <span className="text-sm text-secondary-brand">{unit}</span>}
      </div>

      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-4 text-sm relative z-10">
          <span className={cn("flex items-center", trendConfig?.colorClass)}>
            {TrendIcon && <TrendIcon size={16} className="mr-1" />}
            {trendValue}
          </span>
          {trendDescription && (
            <span className="text-outline text-xs sm:text-sm hidden sm:inline">
              {trendDescription}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
