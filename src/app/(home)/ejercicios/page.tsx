"use client";

import { useState } from "react";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";

interface Exercise {
  id: string;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
}

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [exercises] = useState<Exercise[]>([]);

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (ex: Exercise) => (
        <span className="font-display font-medium text-sm">{ex.name}</span>
      ),
    },
    {
      key: "category",
      label: "Categoría",
      render: (ex: Exercise) => (
        <span className="text-sm text-on-surface-variant">{ex.category}</span>
      ),
    },
    {
      key: "muscleGroup",
      label: "Grupo Muscular",
      render: (ex: Exercise) => (
        <span className="text-sm text-on-surface-variant">
          {ex.muscleGroup}
        </span>
      ),
    },
    {
      key: "equipment",
      label: "Equipamiento",
      render: (ex: Exercise) => (
        <span className="text-sm text-on-surface-variant">{ex.equipment}</span>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable
        title="Ejercicios"
        subtitle="Biblioteca de ejercicios disponibles"
        columns={columns}
        data={exercises}
        keyExtractor={(ex) => ex.id}
        loading={false}
        searchPlaceholder="Buscar ejercicio..."
        onSearch={setSearch}
        totalLabel={`${exercises.length} ejercicios`}
        actions={
          <Button className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm">
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nuevo Ejercicio</span>
          </Button>
        }
      />
    </div>
  );
}
