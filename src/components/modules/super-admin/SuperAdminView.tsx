"use client";

import { useState, useEffect } from "react";
import { Building06Icon, UserGroupIcon, RunningShoesIcon, AddCircleIcon } from "hugeicons-react";
import { MetricCard } from "@/components/common";
import { GenericModal } from "@/components/common";
import { CrearVentaForm } from "./CrearVentaForm";
import { accountClient, userClient } from "@/services/account.service";
import { useCurrentUser } from "@/hooks";

interface GlobalStats {
  totalCuentas: number;
  totalUsuarios: number;
  totalAtletas: number;
}

interface AccountWithStats {
  id: string;
  name: string;
  isOrganization: boolean;
  createdAt: string;
  _count: {
    users: number;
    athletes: number;
  };
  plan: {
    maxCoaches: number;
    maxAthletes: number;
  };
}

export function SuperAdminView() {
  const { isLoading: userLoading } = useCurrentUser();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<GlobalStats>({ totalCuentas: 0, totalUsuarios: 0, totalAtletas: 0 });
  const [accounts, setAccounts] = useState<AccountWithStats[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [accountsRes, usersRes] = await Promise.all([
        accountClient.getAll(),
        userClient.getGlobal(),
      ]);

      const accountsData = accountsRes as AccountWithStats[];
      const usersData = usersRes as Array<{ id: string }>;

      setAccounts(accountsData);
      setStats({
        totalCuentas: accountsData.length,
        totalUsuarios: usersData.length,
        totalAtletas: accountsData.reduce((sum, acc) => sum + (acc._count?.athletes || 0), 0),
      });
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVentaCreada = () => {
    setModalOpen(false);
    loadData();
  };

  if (loading || userLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-36 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display text-on-surface">Panel de Administración</h2>
          <p className="text-sm text-on-surface-variant/50 mt-1">Gestión global de la plataforma</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-on-tertiary-container text-on-surface px-4 py-2.5 rounded-lg font-display text-sm hover:bg-on-tertiary-container/90 transition-colors"
        >
          <AddCircleIcon size={18} />
          Nueva Venta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
        <MetricCard
          label="Cuentas Totales"
          value={stats.totalCuentas}
          icon={<Building06Icon size={20} />}
          trend="up"
          trendValue="+12%"
          trendDescription="este mes"
        />
        <MetricCard
          label="Usuarios Registrados"
          value={stats.totalUsuarios}
          icon={<UserGroupIcon size={20} />}
          trend="up"
          trendValue="+8%"
          trendDescription="este mes"
        />
        <MetricCard
          label="Atletas Totales"
          value={stats.totalAtletas}
          icon={<RunningShoesIcon size={20} />}
          trend="up"
          trendValue="+24%"
          trendDescription="este mes"
        />
      </div>

      <div className="bg-surface-container border border-outline-variant/30 rounded-xl p-5 sm:p-6 space-y-4">
        <h3 className="text-lg sm:text-xl font-display text-on-surface">Cuentas Activas</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-outline-variant/30">
                <th className="text-left text-xs text-on-surface-variant py-3 px-4 font-medium">Nombre</th>
                <th className="text-left text-xs text-on-surface-variant py-3 px-4 font-medium hidden sm:table-cell">Tipo</th>
                <th className="text-left text-xs text-on-surface-variant py-3 px-4 font-medium">Usuarios</th>
                <th className="text-left text-xs text-on-surface-variant py-3 px-4 font-medium hidden md:table-cell">Límite Coaches</th>
                <th className="text-left text-xs text-on-surface-variant py-3 px-4 font-medium">Límite Atletas</th>
                <th className="text-left text-xs text-on-surface-variant py-3 px-4 font-medium hidden lg:table-cell">Creado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-surface-container-high/30 transition-colors">
                  <td className="py-3 px-4 font-display text-sm text-on-surface">{account.name}</td>
                  <td className="py-3 px-4 text-sm text-on-surface-variant hidden sm:table-cell">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                      account.isOrganization
                        ? "bg-surface-container-high text-secondary-brand"
                        : "bg-on-tertiary-container/10 text-on-tertiary-container"
                    }`}>
                      {account.isOrganization ? "Club" : "Individual"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-body text-on-surface">{account._count?.users || 0}</td>
                  <td className="py-3 px-4 text-sm text-on-surface-variant hidden md:table-cell">{account.plan?.maxCoaches || 0}</td>
                  <td className="py-3 px-4 text-sm text-on-surface-variant">{account.plan?.maxAthletes || 0}</td>
                  <td className="py-3 px-4 text-xs text-on-surface-variant hidden lg:table-cell">
                    {new Date(account.createdAt).toLocaleDateString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GenericModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Nueva Venta"
        description="Crear nueva cuenta con usuario inicial"
        size="lg"
      >
        <CrearVentaForm onSuccess={handleVentaCreada} />
      </GenericModal>
    </div>
  );
}