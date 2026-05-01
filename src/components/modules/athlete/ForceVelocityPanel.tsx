"use client";

import { motion } from "framer-motion";
import { ForceVelocityCurve } from "@/components/charts";
import type { AssessmentMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface ForceVelocityPanelProps {
  assessment: AssessmentMock;
}

export function ForceVelocityPanel({ assessment }: ForceVelocityPanelProps) {
  const f0Metric = assessment.metrics.find((m) => m.key === "F0");
  const v0Metric = assessment.metrics.find((m) => m.key === "V0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-surface-container border border-outline-variant/30 rounded-xl p-5 sm:p-6 space-y-5 sm:space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="text-lg sm:text-xl font-display text-on-surface">
          {UI_TEXTS.ATHLETES.FORCE_VELOCITY_PROFILE}
        </h3>
        <div className="flex flex-wrap gap-3">
          {f0Metric && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-on-tertiary-container" />
              <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-wider">
                F0
              </span>
              <span className="text-sm font-body text-on-tertiary-container">
                {f0Metric.rawValue}
              </span>
              <span className="text-xs text-on-surface-variant/40">
                {f0Metric.unit}
              </span>
            </div>
          )}
          {v0Metric && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="text-[10px] text-on-surface-variant/50 uppercase tracking-wider">
                V0
              </span>
              <span className="text-sm font-body text-slate-300">
                {v0Metric.rawValue}
              </span>
              <span className="text-xs text-on-surface-variant/40">
                {v0Metric.unit}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface-container-low rounded-lg p-3 sm:p-4 border border-outline-variant/20">
        <ForceVelocityCurve data={assessment.forceVelocityData} />
      </div>
    </motion.div>
  );
}
