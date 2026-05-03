"use client";

import { useState } from "react";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";

interface Test {
  id: string;
  name: string;
  type: string;
  description: string;
  lastUsed: string;
}

export default function TestsPage() {
  const [search, setSearch] = useState("");
  const [tests] = useState<Test[]>([]);

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (test: Test) => (
        <span className="font-display font-medium text-sm">{test.name}</span>
      ),
    },
    {
      key: "type",
      label: "Tipo",
      render: (test: Test) => (
        <span className="text-sm text-on-surface-variant">{test.type}</span>
      ),
    },
    {
      key: "description",
      label: "Descripción",
      render: (test: Test) => (
        <span className="text-sm text-on-surface-variant">
          {test.description}
        </span>
      ),
    },
    {
      key: "lastUsed",
      label: "Último Uso",
      render: (test: Test) => (
        <span className="text-xs text-on-surface-variant">{test.lastUsed}</span>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable
        title="Tests"
        subtitle="Evaluaciones y tests disponibles"
        columns={columns}
        data={tests}
        keyExtractor={(test) => test.id}
        loading={false}
        searchPlaceholder="Buscar test..."
        onSearch={setSearch}
        totalLabel={`${tests.length} tests`}
        actions={
          <Button className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm">
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nuevo Test</span>
          </Button>
        }
      />
    </div>
  );
}
