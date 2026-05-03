"use client";

import { useState } from "react";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";
import { StatusBadge } from "@/components/common";

interface Account {
  id: string;
  name: string;
  isOrganization: boolean;
  planName: string;
  maxCoaches: number;
  maxAthletes: number;
  isActive: boolean;
  createdAt: string;
}

export default function AccountsPage() {
  const [search, setSearch] = useState("");
  const [accounts] = useState<Account[]>([]);

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (acc: Account) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center shrink-0">
            <span className="font-display font-semibold text-xs text-on-surface-variant">
              {acc.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <span className="font-display font-medium text-sm">{acc.name}</span>
        </div>
      ),
    },
    {
      key: "planName",
      label: "Plan",
      render: (acc: Account) => (
        <span className="text-sm text-on-surface-variant">{acc.planName}</span>
      ),
    },
    {
      key: "maxCoaches",
      label: "Coaches",
      render: (acc: Account) => (
        <span className="text-sm text-on-surface-variant">
          {acc.maxCoaches}
        </span>
      ),
    },
    {
      key: "maxAthletes",
      label: "Atletas",
      render: (acc: Account) => (
        <span className="text-sm text-on-surface-variant">
          {acc.maxAthletes}
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Estado",
      render: (acc: Account) => (
        <StatusBadge variant={acc.isActive ? "active" : "inactive"} />
      ),
    },
    {
      key: "createdAt",
      label: "Fecha Creación",
      render: (acc: Account) => (
        <span className="text-xs text-on-surface-variant">
          {new Date(acc.createdAt).toLocaleDateString("es-AR")}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable
        title="Cuentas"
        subtitle="Gestión de cuentas y organizaciones"
        columns={columns}
        data={accounts}
        keyExtractor={(acc) => acc.id}
        loading={false}
        searchPlaceholder="Buscar cuenta..."
        onSearch={setSearch}
        totalLabel={`${accounts.length} cuentas`}
        actions={
          <Button className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm">
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nueva Cuenta</span>
          </Button>
        }
      />
    </div>
  );
}
