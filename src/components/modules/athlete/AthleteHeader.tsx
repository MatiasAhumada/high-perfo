"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StethoscopeIcon, Edit02Icon } from "hugeicons-react";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import type { AthleteMock } from "@/mocks";
import { StatusBadge } from "@/components/common";

interface AthleteHeaderProps {
  athlete: AthleteMock;
}

export function AthleteHeader({ athlete }: AthleteHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-on-tertiary-container/10 border border-on-tertiary-container/20 flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-lg sm:text-xl text-on-tertiary-container">
            {athlete.firstName[0]}{athlete.lastName[0]}
          </span>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-on-surface leading-tight tracking-tight">
            {athlete.firstName} {athlete.lastName}
          </h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-container-high border border-outline-variant/40 text-xs text-on-surface-variant uppercase tracking-wider">
              {athlete.position}
            </span>
            <span className="text-xs text-on-surface-variant/40 uppercase tracking-wider">{athlete.sport}</span>
            <StatusBadge variant={athlete.active ? "active" : "inactive"} />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          className="gap-2 font-display rounded-lg border-outline-variant/40 text-on-surface-variant hover:text-on-surface hover:border-outline-variant text-sm flex-1 sm:flex-none"
        >
          <StethoscopeIcon size={16} />
          <span className="hidden sm:inline">{UI_TEXTS.ATHLETES.MEDICAL_HISTORY}</span>
          <span className="sm:hidden">Historial</span>
        </Button>
        <Button className="gap-2 font-display rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-slate-100 shadow-lg shadow-red-900/20 text-sm flex-1 sm:flex-none">
          <Edit02Icon size={16} />
          <span className="hidden sm:inline">{UI_TEXTS.ATHLETES.EDIT_PROFILE}</span>
          <span className="sm:hidden">Editar</span>
        </Button>
      </div>
    </motion.div>
  );
}