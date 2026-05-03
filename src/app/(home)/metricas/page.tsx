"use client";

import { useState } from "react";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";
import { StatusBadge } from "@/components/common";

interface Metric {
  id: string;
  name: string;
  key: string;
  unit: string;
  category: string;
  isActive: boolean;
}

export default function MetricsPage() {
  const [search, setSearch] = useState("");
  const [metrics] = useState<Metric[]>([]);

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (metric: Metric) => (
        <span className="font-display font-medium text-sm">{metric.name}</span>
      ),
    },
    {
      key: "key",
      label: "Clave",
      render: (metric: Metric) => (
        <span className="text-sm font-mono text-on-surface-variant">
          {metric.key}
        </span>
      ),
    },
    {
      key: "unit",
      label: "Unidad",
      render: (metric: Metric) => (
        <span className="text-sm text-on-surface-variant">{metric.unit}</span>
      ),
    },
    {
      key: "category",
      label: "Categoría",
      render: (metric: Metric) => (
        <span className="text-sm text-on-surface-variant">
          {metric.category}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Estado",
      render: (metric: Metric) => (
        <StatusBadge variant={metric.isActive ? "active" : "inactive"} />
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable
        title="Métricas"
        subtitle="Definiciones de métricas del sistema"
        columns={columns}
        data={metrics}
        keyExtractor={(metric) => metric.id}
        loading={false}
        searchPlaceholder="Buscar métrica..."
        onSearch={setSearch}
        totalLabel={`${metrics.length} métricas`}
        actions={
          <Button className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm">
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nueva Métrica</span>
          </Button>
        }
      />
    </div>
  );
}
