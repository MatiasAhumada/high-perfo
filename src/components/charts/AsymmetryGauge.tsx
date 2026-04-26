"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AsymmetryDataMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface AsymmetryGaugeProps {
  data: AsymmetryDataMock[];
  asiIndex: number;
  threshold?: number;
}

const ASYMMETRY_THRESHOLD = 15;

export function AsymmetryGauge({ data, asiIndex, threshold = ASYMMETRY_THRESHOLD }: AsymmetryGaugeProps) {
  const isAlert = asiIndex > threshold;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-label-caps text-on-surface-variant/50 uppercase tracking-wider">
          {UI_TEXTS.METRICS.ASI}
        </span>
        {isAlert && (
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container/40 border border-on-tertiary-container/30 text-on-tertiary-container text-label-caps uppercase tracking-wider font-semibold"
          >
            &gt;{threshold}%
          </motion.span>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "text-display-lg font-display leading-none tracking-tight",
          isAlert ? "text-on-tertiary-container" : "text-on-surface"
        )}
      >
        {asiIndex.toFixed(1)}
        <span className="text-data-mono font-data text-on-surface-variant/60 ml-1">%</span>
      </motion.div>

      <div className="relative w-full h-3 bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(asiIndex, 100)}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={cn(
            "h-full rounded-full",
            isAlert ? "bg-on-tertiary-container" : "bg-secondary-brand"
          )}
        />
        <div
          className="absolute top-0 bottom-0 w-px bg-on-surface-variant/30"
          style={{ left: `${threshold}%` }}
        />
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.side} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-data-mono font-data text-on-surface-variant/70 text-sm">{item.side}</span>
              <span
                className={cn(
                  "text-data-mono font-data text-sm",
                  isAlert && item.value > 55 ? "text-on-tertiary-container" : "text-on-surface"
                )}
              >
                {item.value.toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface-container-low rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.value}%` }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={cn(
                  "h-full rounded-full",
                  isAlert && item.value > 55 ? "bg-on-tertiary-container/70" : "bg-secondary-brand/60"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
