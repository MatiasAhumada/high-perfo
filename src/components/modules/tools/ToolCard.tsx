"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/common";
import type { ToolMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface ToolCardProps {
  tool: ToolMock;
  onToggle: (id: string) => void;
  delay?: number;
}

export function ToolCard({ tool, onToggle, delay = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      className={cn(
        "relative bg-surface-container-high border rounded-xl p-5 sm:p-6 space-y-4 transition-all cursor-pointer group hover:shadow-lg",
        tool.active ? "border-on-tertiary-container/30 shadow-red-900/10" : "border-outline-variant/30 hover:border-outline-variant/60"
      )}
      onClick={() => onToggle(tool.id)}
    >
      {tool.active && (
        <div className="absolute -top-px -right-px w-20 h-20 bg-on-tertiary-container/5 rounded-bl-[2rem] pointer-events-none" />
      )}

      {tool.active && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-on-tertiary-container/40 via-on-tertiary-container/20 to-transparent" />
      )}

      <div className="flex items-start justify-between relative z-10">
        <div>
          <h3 className="font-display font-semibold text-on-surface text-sm sm:text-base">{tool.name}</h3>
          <p className="text-[10px] sm:text-xs text-on-surface-variant/40 mt-0.5 uppercase tracking-wider">{tool.category}</p>
        </div>
        <StatusBadge variant={tool.active ? "active" : "inactive"} />
      </div>

      <p className="text-sm text-on-surface-variant/60 relative z-10 leading-relaxed line-clamp-2">{tool.description}</p>

      <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20 relative z-10">
        <span
          className={cn(
            "text-[10px] uppercase tracking-wider font-semibold",
            tool.active ? "text-on-tertiary-container" : "text-on-surface-variant/30"
          )}
        >
          {tool.active ? UI_TEXTS.TOOLS.ACTIVATED : UI_TEXTS.TOOLS.DEACTIVATED}
        </span>
        <div
          className={cn(
            "w-10 h-5 sm:w-11 h-6 rounded-full transition-colors relative",
            tool.active ? "bg-on-tertiary-container" : "bg-outline-variant/40"
          )}
        >
          <motion.div
            animate={{ x: tool.active ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-4 h-4 rounded-full bg-on-surface absolute top-0.5"
          />
        </div>
      </div>
    </motion.div>
  );
}