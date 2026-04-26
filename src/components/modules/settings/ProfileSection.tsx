"use client";

import { motion } from "framer-motion";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

const INPUT_CLASSES = "w-full bg-transparent border-b border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/30 focus:border-on-tertiary-container focus:outline-none pb-2 pt-4 text-sm font-body transition-colors";

interface ProfileSectionProps {
  delay?: number;
}

export function ProfileSection({ delay = 0 }: ProfileSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 space-y-6"
    >
      <h3 className="font-display font-semibold text-on-surface">{UI_TEXTS.SETTINGS.PROFILE}</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-label-caps text-on-surface-variant/50 block mb-1">Nombre</label>
          <input className={INPUT_CLASSES} placeholder="Alejandro" defaultValue="Alejandro" />
        </div>
        <div>
          <label className="text-label-caps text-on-surface-variant/50 block mb-1">Apellido</label>
          <input className={INPUT_CLASSES} placeholder="Gutiérrez" defaultValue="Gutiérrez" />
        </div>
      </div>
      <div>
        <label className="text-label-caps text-on-surface-variant/50 block mb-1">Email</label>
        <input className={INPUT_CLASSES} placeholder="a.gutierrez@highperfo.com" defaultValue="a.gutierrez@highperfo.com" />
      </div>
    </motion.section>
  );
}
