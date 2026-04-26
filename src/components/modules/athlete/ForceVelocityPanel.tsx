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
      className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-headline-md font-display text-on-surface">
          {UI_TEXTS.ATHLETES.FORCE_VELOCITY_PROFILE}
        </h3>
        <div className="flex gap-4">
          {f0Metric && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-on-tertiary-container" />
              <span className="text-label-caps text-on-surface-variant/50 uppercase tracking-wider">F0</span>
              <span className="text-data-mono font-data text-on-tertiary-container">{f0Metric.rawValue}</span>
              <span className="text-xs text-on-surface-variant/40">{f0Metric.unit}</span>
            </div>
          )}
          {v0Metric && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span className="text-label-caps text-on-surface-variant/50 uppercase tracking-wider">V0</span>
              <span className="text-data-mono font-data text-slate-300">{v0Metric.rawValue}</span>
              <span className="text-xs text-on-surface-variant/40">{v0Metric.unit}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant/20">
        <ForceVelocityCurve data={assessment.forceVelocityData} />
      </div>
    </motion.div>
  );
}
