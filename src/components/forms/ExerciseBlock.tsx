"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cancel01Icon, Settings01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface ExerciseBlockProps {
  exerciseName: string;
  sets: number;
  reps: number;
  percent1RM: number;
  showAdvanced?: boolean;
  onRemove: () => void;
  onUpdate: (field: string, value: number | string) => void;
}

const INLINE_INPUT_CLASSES =
  "w-full bg-transparent border-0 border-b border-outline-variant/30 text-on-surface text-sm sm:text-base font-body text-center py-1.5 focus:border-on-tertiary-container focus:outline-none transition-colors";

export function ExerciseBlock({
  exerciseName,
  sets,
  reps,
  percent1RM,
  showAdvanced,
  onRemove,
  onUpdate,
}: ExerciseBlockProps) {
  const [advancedOpen, setAdvancedOpen] = useState(showAdvanced ?? false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="relative bg-surface-container border border-outline-variant/30 rounded-lg overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-on-tertiary-container/60" />

      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-display font-semibold text-on-surface text-sm sm:text-base">
            {exerciseName}
          </h4>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="text-on-surface-variant/50 hover:text-on-surface-variant"
            >
              <Settings01Icon size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onRemove}
              className="text-on-tertiary-container/60 hover:text-on-tertiary-container"
            >
              <Cancel01Icon size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1.5 uppercase tracking-wider">
              {UI_TEXTS.ROUTINES.SETS}
            </label>
            <input
              type="number"
              value={sets}
              onChange={(e) => onUpdate("sets", Number(e.target.value))}
              className={INLINE_INPUT_CLASSES}
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1.5 uppercase tracking-wider">
              {UI_TEXTS.ROUTINES.REPS}
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => onUpdate("reps", Number(e.target.value))}
              className={INLINE_INPUT_CLASSES}
            />
          </div>
          <div>
            <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1.5 uppercase tracking-wider">
              {UI_TEXTS.ROUTINES.INTENSITY}
            </label>
            <input
              type="number"
              value={percent1RM}
              onChange={(e) => onUpdate("percent1RM", Number(e.target.value))}
              className={INLINE_INPUT_CLASSES}
            />
          </div>
        </div>

        <AnimatePresence>
          {advancedOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-outline-variant/20 grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1.5 uppercase tracking-wider">
                    Vel. Objetivo
                  </label>
                  <input
                    type="text"
                    placeholder="0.8 m/s"
                    className={INLINE_INPUT_CLASSES}
                  />
                </div>
                <div>
                  <label className="text-[10px] sm:text-xs text-on-surface-variant/50 block mb-1.5 uppercase tracking-wider">
                    RPE Objetivo
                  </label>
                  <input
                    type="text"
                    placeholder="8"
                    className={INLINE_INPUT_CLASSES}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
