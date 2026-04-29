"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Pdf01Icon, TableIcon, SentIcon } from "hugeicons-react";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface RoutineHeaderProps {
  onSendEmail: () => void;
}

type SegmentValue = "draft" | "review" | "sent";

export function RoutineHeader({ onSendEmail }: RoutineHeaderProps) {
  const segments: { key: SegmentValue; label: string }[] = [
    { key: "draft", label: "Borrador" },
    { key: "review", label: "Revisión" },
    { key: "sent", label: "Enviado" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 sm:pb-6 border-b border-outline-variant/20"
    >
      <div>
        <h2 className="text-lg sm:text-xl lg:text-2xl font-display text-on-surface tracking-tight">
          {UI_TEXTS.ROUTINES.TITLE}
        </h2>
        <p className="text-sm text-on-surface-variant/50 mt-1 font-body hidden sm:block">
          {UI_TEXTS.ROUTINES.SUBTITLE}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full lg:w-auto">
        <div className="flex bg-surface-container-low rounded-lg border border-outline-variant/30 p-0.5">
          {segments.map((seg) => (
            <button
              key={seg.key}
              className="px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-on-surface-variant/50 hover:text-on-surface-variant transition-colors rounded-md font-display first:bg-on-tertiary-container/10 first:text-on-tertiary-container first:font-semibold"
            >
              {seg.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 font-display rounded-lg border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline-variant text-xs"
          >
            <Pdf01Icon size={14} />
            <span className="hidden sm:inline">{UI_TEXTS.ROUTINES.EXPORT_PDF}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 font-display rounded-lg border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline-variant text-xs"
          >
            <TableIcon size={14} />
            <span className="hidden sm:inline">{UI_TEXTS.ROUTINES.EXPORT_EXCEL}</span>
          </Button>
          <Button
            size="sm"
            onClick={onSendEmail}
            className="bg-[#dc2626] hover:bg-[#b91c1c] text-slate-100 font-display gap-1.5 rounded-lg shadow-lg shadow-red-900/20 text-xs"
          >
            <SentIcon size={14} />
            <span className="hidden sm:inline">{UI_TEXTS.ROUTINES.SEND_BY_EMAIL}</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}