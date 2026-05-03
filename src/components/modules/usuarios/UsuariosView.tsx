"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useCurrentUser } from "@/hooks";
import { userClient, accountClient } from "@/services/account.service";
import { DataTable } from "@/components/common";
import { GenericModal } from "@/components/common";
import { StatusBadge } from "@/components/common";
import { UsuarioForm } from "./UsuarioForm";
import { CrearVentaForm } from "../super-admin/CrearVentaForm";
import { AddCircleIcon, Building06Icon } from "hugeicons-react";
import type { Role } from "@prisma/client";
import { toastSuccess, toastError } from "@/utils/toast.util";

interface Usuario {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  account?: {
    id: string;
    name: string;
    isOrganization: boolean;
  };
}

export function UsuariosView() {
  const {
    role,
    accountId,
    isSuperAdmin,
    isAdminView,
    isLoading: userLoading,
  } = useCurrentUser();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cuentas, setCuentas] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalUsuarioOpen, setModalUsuarioOpen] = useState(false);
  const [modalCuentaOpen, setModalCuentaOpen] = useState(false);
  const hasLoadedRef = useRef(false);
  const loadingRef = useRef(false);
  const cuentasLoadedRef = useRef(false);

  useEffect(() => {
    if (userLoading) return;
    if (hasLoadedRef.current) return;
    if (!accountId && !isSuperAdmin) return;

    hasLoadedRef.current = true;

    const fetchData = async () => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      try {
        setLoading(true);
        let usuariosData: Usuario[];

        if (isSuperAdmin && isAdminView) {
          usuariosData = await userClient.getGlobal();
          if (!cuentasLoadedRef.current) {
            const cuentasData = await accountClient.getAll();
            setCuentas(cuentasData);
            cuentasLoadedRef.current = true;
          }
        } else {
          usuariosData = await userClient.getAll(accountId!);
        }

        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    };

    fetchData();
  }, [userLoading, accountId, isSuperAdmin, isAdminView]);

  const loadData = async (searchTerm?: string) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      setLoading(true);
      let usuariosData: Usuario[];

      if (isSuperAdmin && isAdminView) {
        usuariosData = await userClient.getGlobal(searchTerm);
      } else {
        usuariosData = await userClient.getAll(accountId!, searchTerm);
      }

      setUsuarios(usuariosData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    loadData(value);
  };

  const handleUsuarioCreado = () => {
    setModalUsuarioOpen(false);
    loadData(search);
  };

  const handleCuentaCreada = () => {
    setModalCuentaOpen(false);
    loadData(search);
  };

  const handleToggleActive = async (userId: string, currentStatus: boolean) => {
    try {
      await userClient.updateStatus(userId, !currentStatus);
      toastSuccess(!currentStatus ? "Usuario activado" : "Usuario desactivado");
      loadData(search);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toastError(err.response?.data?.message || "Error al cambiar estado");
    }
  };

  const columns = [
    {
      key: "name",
      label: "Nombre",
      render: (u: Usuario) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center shrink-0">
            <span className="font-display font-semibold text-xs text-on-surface-variant">
              {u.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
          <span className="font-display font-medium text-sm text-on-surface">
            {u.name}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      render: (u: Usuario) => (
        <span className="text-sm text-on-surface-variant">{u.email}</span>
      ),
    },
    ...(isSuperAdmin && isAdminView
      ? [
          {
            key: "role",
            label: "Rol",
            render: (u: Usuario) => (
              <span
                className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold ${
                  u.role === "ORG_ADMIN"
                    ? "bg-on-tertiary-container/10 text-on-tertiary-container"
                    : u.role === "SUPER_ADMIN"
                      ? "bg-secondary-brand/20 text-secondary-brand"
                      : "bg-surface-container-high text-secondary-brand"
                }`}
              >
                {u.role === "ORG_ADMIN"
                  ? "Admin"
                  : u.role === "SUPER_ADMIN"
                    ? "Super"
                    : "Coach"}
              </span>
            ),
          },
          {
            key: "account",
            label: "Cuenta",
            render: (u: Usuario) => (
              <span className="text-sm text-on-surface-variant">
                {u.account?.name || "—"}
              </span>
            ),
          },
        ]
      : []),
    {
      key: "isActive",
      label: "Estado",
      render: (u: Usuario) => (
        <button
          onClick={() => handleToggleActive(u.id, u.isActive)}
          className="cursor-pointer"
        >
          <StatusBadge variant={u.isActive ? "active" : "inactive"} />
        </button>
      ),
    },
    {
      key: "createdAt",
      label: "Fecha Creación",
      render: (u: Usuario) => (
        <span className="text-xs text-on-surface-variant">
          {new Date(u.createdAt).toLocaleDateString("es-AR")}
        </span>
      ),
    },
  ];

  const title = isSuperAdmin && isAdminView ? "Usuarios" : "Entrenadores";

  if (loading && usuarios.length === 0) {
    return (
      <div className="space-y-4">
        <div className="h-12 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse" />
        <div className="h-64 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-display text-on-surface">
            {title}
          </h2>
          <p className="text-sm text-on-surface-variant/50 mt-1">
            {isSuperAdmin && isAdminView
              ? "Gestión de usuarios y cuentas"
              : "Entrenadores de tu organización"}
          </p>
        </div>
        <div className="flex gap-2">
          {isSuperAdmin && isAdminView && (
            <button
              onClick={() => setModalCuentaOpen(true)}
              className="flex items-center gap-2 bg-surface-container border border-outline-variant/30 text-on-surface px-4 py-2.5 rounded-lg font-display text-sm hover:border-outline-variant/50 transition-colors"
            >
              <Building06Icon size={16} />
              Nueva Cuenta
            </button>
          )}
          <button
            onClick={() => setModalUsuarioOpen(true)}
            className="flex items-center gap-2 bg-on-tertiary-container text-on-surface px-4 py-2.5 rounded-lg font-display text-sm hover:bg-on-tertiary-container/90 transition-colors"
          >
            <AddCircleIcon size={16} />
            Nuevo
          </button>
        </div>
      </div>

      <DataTable
        title=""
        subtitle=""
        columns={columns}
        data={usuarios}
        keyExtractor={(u) => u.id}
        loading={loading}
        searchPlaceholder="Buscar usuario..."
        onSearch={handleSearch}
        totalLabel={`${usuarios.length} ${title.toLowerCase()}`}
      />

      <GenericModal
        open={modalUsuarioOpen}
        onOpenChange={setModalUsuarioOpen}
        title={
          isSuperAdmin && isAdminView ? "Nuevo Usuario" : "Nuevo Entrenador"
        }
        size="md"
      >
        <UsuarioForm
          cuentas={cuentas}
          currentAccountId={accountId!}
          isGlobal={isSuperAdmin && isAdminView}
          onSuccess={handleUsuarioCreado}
        />
      </GenericModal>

      <GenericModal
        open={modalCuentaOpen}
        onOpenChange={setModalCuentaOpen}
        title="Nueva Cuenta"
        description="Crear cuenta con usuario inicial"
        size="lg"
      >
        <CrearVentaForm onSuccess={handleCuentaCreada} />
      </GenericModal>
    </div>
  );
}
