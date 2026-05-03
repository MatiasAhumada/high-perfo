"use client";

import { useState } from "react";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";
import { StatusBadge } from "@/components/common";

interface Plan {
  id: string;
  name: string;
  maxCoaches: number;
  maxAthletes: number;
  price: number;
  isActive: boolean;
}

export default function PlansPage() {
  const [search, setSearch] = useState("");
  const [plans] = useState<Plan[]>([]);

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (plan: Plan) => (
        <span className="font-display font-medium text-sm">{plan.name}</span>
      ),
    },
    {
      key: "maxCoaches",
      label: "Máx. Coaches",
      render: (plan: Plan) => (
        <span className="text-sm text-on-surface-variant">
          {plan.maxCoaches}
        </span>
      ),
    },
    {
      key: "maxAthletes",
      label: "Máx. Atletas",
      render: (plan: Plan) => (
        <span className="text-sm text-on-surface-variant">
          {plan.maxAthletes}
        </span>
      ),
    },
    {
      key: "price",
      label: "Precio",
      render: (plan: Plan) => (
        <span className="text-sm font-display font-semibold text-on-surface">
          ${plan.price}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Estado",
      render: (plan: Plan) => (
        <StatusBadge variant={plan.isActive ? "active" : "inactive"} />
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable
        title="Planes"
        subtitle="Gestión de planes de suscripción"
        columns={columns}
        data={plans}
        keyExtractor={(plan) => plan.id}
        loading={false}
        searchPlaceholder="Buscar plan..."
        onSearch={setSearch}
        totalLabel={`${plans.length} planes`}
        actions={
          <Button className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm">
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nuevo Plan</span>
          </Button>
        }
      />
    </div>
  );
}
