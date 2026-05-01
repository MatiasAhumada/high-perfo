"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { ExerciseBlock } from "./ExerciseBlock";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import type { TemplateExerciseMock } from "@/mocks";

const routineSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  description: z.string().min(5, "Mínimo 5 caracteres"),
});

type RoutineFormData = z.infer<typeof routineSchema>;

interface RoutineBuilderFormProps {
  initialExercises?: TemplateExerciseMock[];
  onSubmit: (data: RoutineFormData, exercises: TemplateExerciseMock[]) => void;
}

const INPUT_CLASSES =
  "w-full bg-transparent border-b border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/30 focus:border-on-tertiary-container focus:outline-none pb-2 pt-4 text-sm font-body transition-colors";

let nextExerciseId = 100;

export function RoutineBuilderForm({
  initialExercises,
  onSubmit,
}: RoutineBuilderFormProps) {
  const [exercises, setExercises] = useState<TemplateExerciseMock[]>(
    initialExercises ?? [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RoutineFormData>({
    resolver: zodResolver(routineSchema),
    defaultValues: { name: "", description: "" },
    mode: "onChange",
  });

  const addExercise = () => {
    const newExercise: TemplateExerciseMock = {
      id: `ex-${nextExerciseId++}`,
      exerciseName: "Nuevo Ejercicio",
      sets: 3,
      reps: 8,
      percent1RM: 70,
      advancedSettings: false,
    };
    setExercises((prev) => [...prev, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  };

  const updateExercise = (
    exerciseId: string,
    field: string,
    value: number | string,
  ) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)),
    );
  };

  const handleFormSubmit = (data: RoutineFormData) => {
    onSubmit(data, exercises);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="text-label-caps text-on-surface-variant/50 block mb-1">
          {UI_TEXTS.ROUTINES.ROUTINE_NAME}
        </label>
        <input
          {...register("name")}
          className={INPUT_CLASSES}
          placeholder="Nombre de la rutina"
        />
        {errors.name && (
          <p className="text-on-tertiary-container text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-label-caps text-on-surface-variant/50 block mb-1">
          {UI_TEXTS.ROUTINES.ROUTINE_DESCRIPTION}
        </label>
        <input
          {...register("description")}
          className={INPUT_CLASSES}
          placeholder="Descripción del protocolo"
        />
        {errors.description && (
          <p className="text-on-tertiary-container text-xs mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {exercises.map((exercise) => (
            <ExerciseBlock
              key={exercise.id}
              exerciseName={exercise.exerciseName}
              sets={exercise.sets}
              reps={exercise.reps}
              percent1RM={exercise.percent1RM}
              showAdvanced={exercise.advancedSettings}
              onRemove={() => removeExercise(exercise.id)}
              onUpdate={(field, value) =>
                updateExercise(exercise.id, field, value)
              }
            />
          ))}
        </AnimatePresence>

        <Button
          type="button"
          variant="outline"
          onClick={addExercise}
          className="w-full border-dashed border-outline-variant/50 text-on-surface-variant/60 hover:text-on-surface-variant hover:border-on-tertiary-container/40 font-display gap-2 rounded-lg"
        >
          <AddCircleIcon size={18} />
          {UI_TEXTS.ROUTINES.ADD_EXERCISE}
        </Button>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={!isValid}
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {UI_TEXTS.ACTIONS.SAVE}
        </Button>
      </div>
    </form>
  );
}
