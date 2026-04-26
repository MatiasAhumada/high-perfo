"use client";

import { motion } from "framer-motion";
import { Activity01Icon } from "hugeicons-react";
import { MetricCard } from "@/components/common";
import { SessionBarChart } from "@/components/charts";
import type { AssessmentMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface PowerKineticsPanelProps {
  assessment: AssessmentMock;
}

export function PowerKineticsPanel({ assessment }: PowerKineticsPanelProps) {
  const sjMetric = assessment.metrics.find((m) => m.key === "SJ");
  const cmjMetric = assessment.metrics.find((m) => m.key === "CMJ");
  const djMetric = assessment.metrics.find((m) => m.key === "DJ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 space-y-6 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-on-tertiary-container/40 to-transparent" />

      <div className="flex items-center gap-3">
        <Activity01Icon size={18} className="text-on-tertiary-container" />
        <h3 className="text-headline-md font-display text-on-surface">
          {UI_TEXTS.ATHLETES.POWER_KINETICS}
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sjMetric && (
          <MetricCard
            label={UI_TEXTS.METRICS.SJ}
            value={sjMetric.rawValue.toFixed(1)}
            unit={sjMetric.unit}
            trend="up"
            trendValue="+2.5%"
            delay={0.15}
            className="border-0 bg-surface-container-low p-4"
          />
        )}
        {cmjMetric && (
          <MetricCard
            label={UI_TEXTS.METRICS.CMJ}
            value={cmjMetric.rawValue.toFixed(1)}
            unit={cmjMetric.unit}
            trend="up"
            trendValue="+3.1%"
            delay={0.2}
            className="border-0 bg-surface-container-low p-4"
          />
        )}
        {djMetric && (
          <MetricCard
            label={UI_TEXTS.METRICS.DJ}
            value={djMetric.rawValue.toFixed(1)}
            unit={djMetric.unit}
            trend="up"
            trendValue="+1.8%"
            delay={0.25}
            className="border-0 bg-surface-container-low p-4"
          />
        )}
      </div>

      <SessionBarChart data={assessment.sessionHistory} />
    </motion.div>
  );
}
