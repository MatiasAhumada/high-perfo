"use client";

import { useState } from "react";
import { RoutineHeader, ExerciseList, ToolboxSection } from "@/components/modules/routines";
import { GenericModal } from "@/components/common";
import { SendRoutineForm } from "@/components/forms";
import { useRoutines, useTools, useAthletes } from "@/hooks";
import { toastSuccess } from "@/utils/toast.util";
import type { TemplateExerciseMock } from "@/mocks";

let nextExerciseId = 200;

export default function RutinasPage() {
  const { routines } = useRoutines();
  const { tools } = useTools();
  const { athletes } = useAthletes();
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>(
    routines[0]?.toolboxItems ?? []
  );

  const [exercises, setExercises] = useState<TemplateExerciseMock[]>(
    routines[0]?.exercises ?? []
  );

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

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const updateExercise = (id: string, field: string, value: number | string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const toggleTool = (toolId: string) => {
    setSelectedToolIds((prev) =>
      prev.includes(toolId) ? prev.filter((t) => t !== toolId) : [...prev, toolId]
    );
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <RoutineHeader onSendEmail={() => setSendModalOpen(true)} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        <div className="col-span-1 xl:col-span-8">
          <ExerciseList
            exercises={exercises}
            onAdd={addExercise}
            onRemove={removeExercise}
            onUpdate={updateExercise}
          />
        </div>
        <div className="col-span-1 xl:col-span-4">
          <ToolboxSection
            tools={tools}
            selectedTools={selectedToolIds}
            onToggle={toggleTool}
          />
        </div>
      </div>

      <GenericModal
        open={sendModalOpen}
        onOpenChange={setSendModalOpen}
        title="Enviar Rutina"
        size="lg"
      >
        <SendRoutineForm
          athletes={athletes}
          routineName={routines[0]?.name ?? "Rutina sin nombre"}
        />
      </GenericModal>
    </div>
  );
}