"use client";

import { motion } from "framer-motion";
import { Alert01Icon } from "hugeicons-react";
import { AsymmetryGauge } from "@/components/charts";
import { StatusBadge } from "@/components/common";
import type { AssessmentMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface AsymmetryPanelProps {
  assessment: AssessmentMock;
}

export function AsymmetryPanel({ assessment }: AsymmetryPanelProps) {
  const asiThreshold = 10;
  const isAlert = assessment.asiIndex > asiThreshold;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-headline-md font-display text-on-surface">
          {UI_TEXTS.ATHLETES.ASYMMETRY_ANALYSIS}
        </h3>
        {isAlert && <StatusBadge variant="warning" />}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-display-lg font-display text-on-tertiary-container tracking-tight">
          {assessment.asiIndex}%
        </span>
        <span className="text-label-caps text-on-surface-variant uppercase tracking-wider">
          {UI_TEXTS.METRICS.ASI}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-center">
        {assessment.asymmetryData.map((item) => (
          <div
            key={item.side}
            className="bg-surface-container-low rounded-lg p-4 border border-outline-variant/20"
          >
            <p className="text-label-caps text-on-surface-variant/50 uppercase tracking-wider mb-2">
              {item.side}
            </p>
            <p className="text-data-mono font-data text-on-surface text-xl">
              {item.value.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>

      <AsymmetryGauge
        data={assessment.asymmetryData}
        asiIndex={assessment.asiIndex}
      />
    </motion.div>
  );
}
