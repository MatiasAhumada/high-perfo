"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ToolMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface ToolboxSectionProps {
  tools: ToolMock[];
  selectedTools: string[];
  onToggle: (toolId: string) => void;
}

export function ToolboxSection({ tools, selectedTools, onToggle }: ToolboxSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-surface-container border border-outline-variant/30 rounded-xl p-5 sm:p-6 space-y-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-on-tertiary-container/30 to-transparent" />

      <h3 className="text-lg sm:text-xl font-display text-on-surface tracking-tight">
        {UI_TEXTS.ROUTINES.TOOLBOX}
      </h3>

      <div className="space-y-2 sm:space-y-3">
        {tools.map((tool) => {
          const isSelected = selectedTools.includes(tool.id);
          return (
            <label
              key={tool.id}
              className={cn(
                "flex items-center justify-between p-3 sm:p-4 rounded-lg border cursor-pointer transition-all group",
                isSelected
                  ? "bg-on-tertiary-container/5 border-on-tertiary-container/30"
                  : "bg-surface-container-low border-outline-variant/20 hover:border-outline-variant/50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0",
                    isSelected
                      ? "bg-on-tertiary-container border-on-tertiary-container"
                      : "border-outline-variant/50 group-hover:border-outline-variant"
                  )}
                >
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm text-on-surface font-medium truncate">{tool.name}</p>
                  <p className="text-xs text-on-surface-variant/40 mt-0.5 hidden sm:block">{tool.description}</p>
                </div>
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs uppercase tracking-wider font-semibold shrink-0",
                  isSelected ? "text-on-tertiary-container" : "text-on-surface-variant/30"
                )}
              >
                {isSelected ? UI_TEXTS.TOOLS.ACTIVATED : UI_TEXTS.TOOLS.DEACTIVATED}
              </span>
            </label>
          );
        })}
      </div>
    </motion.div>
  );
}