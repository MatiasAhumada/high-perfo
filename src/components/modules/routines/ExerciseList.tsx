"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExerciseBlock } from "@/components/forms";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import type { TemplateExerciseMock } from "@/mocks";

interface ExerciseListProps {
  exercises: TemplateExerciseMock[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: number | string) => void;
}

export function ExerciseList({ exercises, onAdd, onRemove, onUpdate }: ExerciseListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: index * 0.05 }}
          >
            <ExerciseBlock
              exerciseName={exercise.exerciseName}
              sets={exercise.sets}
              reps={exercise.reps}
              percent1RM={exercise.percent1RM}
              showAdvanced={exercise.advancedSettings}
              onRemove={() => onRemove(exercise.id)}
              onUpdate={(field, value) => onUpdate(exercise.id, field, value)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={onAdd}
        className="w-full border-dashed border-outline-variant/50 text-on-surface-variant/60 hover:text-on-surface-variant hover:border-on-tertiary-container/40 font-display gap-2 rounded-lg"
      >
        <AddCircleIcon size={18} />
        {UI_TEXTS.ROUTINES.ADD_EXERCISE}
      </Button>
    </div>
  );
}
