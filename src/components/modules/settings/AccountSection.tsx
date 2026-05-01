"use client";

import { motion } from "framer-motion";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

const INPUT_CLASSES =
  "w-full bg-transparent border-b border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/30 focus:border-on-tertiary-container focus:outline-none pb-2 pt-3 sm:pt-4 text-sm font-body transition-colors";

interface AccountSectionProps {
  delay?: number;
}

export function AccountSection({ delay = 0 }: AccountSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container border border-outline-variant/30 rounded-xl p-5 sm:p-6 space-y-5 sm:space-y-6"
    >
      <h3 className="font-display font-semibold text-on-surface">
        {UI_TEXTS.SETTINGS.ACCOUNT}
      </h3>
      <div>
        <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
          Organización
        </label>
        <input
          className={INPUT_CLASSES}
          placeholder="FinanciaTech"
          defaultValue="FinanciaTech"
        />
      </div>
      <div>
        <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1">
          Rol
        </label>
        <input className={INPUT_CLASSES} defaultValue="ORG_ADMIN" disabled />
      </div>
    </motion.section>
  );
}
