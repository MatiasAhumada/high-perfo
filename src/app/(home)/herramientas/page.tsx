"use client";

import { useState } from "react";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";
import { StatusBadge } from "@/components/common";

interface ToolTemplate {
  id: string;
  name: string;
  toolKey: string;
  exerciseCount: number;
  isGlobal: boolean;
  createdBy: string;
}

export default function HerramientasPage() {
  const [search, setSearch] = useState("");
  const [tools] = useState<ToolTemplate[]>([]);

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (tool: ToolTemplate) => (
        <span className="font-display font-medium text-sm">{tool.name}</span>
      ),
    },
    {
      key: "toolKey",
      label: "Tipo",
      render: (tool: ToolTemplate) => (
        <span className="text-sm text-on-surface-variant">{tool.toolKey}</span>
      ),
    },
    {
      key: "exerciseCount",
      label: "Ejercicios",
      render: (tool: ToolTemplate) => (
        <span className="text-sm text-on-surface-variant">
          {tool.exerciseCount} ejercicios
        </span>
      ),
    },
    {
      key: "isGlobal",
      label: "Alcance",
      render: (tool: ToolTemplate) => (
        <StatusBadge
          variant={tool.isGlobal ? "active" : "inactive"}
          label={tool.isGlobal ? "Global" : "Personal"}
        />
      ),
    },
    {
      key: "createdBy",
      label: "Creado por",
      render: (tool: ToolTemplate) => (
        <span className="text-xs text-on-surface-variant">{tool.createdBy}</span>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable
        title="Herramientas"
        subtitle="Plantillas de tests y planillas con ejercicios predefinidos"
        columns={columns}
        data={tools}
        keyExtractor={(tool) => tool.id}
        loading={false}
        searchPlaceholder="Buscar herramienta..."
        onSearch={setSearch}
        totalLabel={`${tools.length} herramientas`}
        actions={
          <Button className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm">
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nueva Herramienta</span>
          </Button>
        }
      />
    </div>
  );
}
