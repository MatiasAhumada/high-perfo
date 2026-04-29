"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userClient } from "@/services/account.service";
import { toastSuccess, toastError } from "@/utils/toast.util";

interface UsuarioFormProps {
  cuentas: { id: string; name: string }[];
  currentAccountId: string;
  isGlobal: boolean;
  onSuccess: () => void;
}

export function UsuarioForm({ cuentas, currentAccountId, isGlobal, onSuccess }: UsuarioFormProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "COACH" as "ORG_ADMIN" | "COACH",
    accountId: currentAccountId,
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (form.password !== form.passwordConfirm) {
      toastError("Las contraseñas no coinciden");
      return;
    }

    if (!form.name || !form.email || !form.password) {
      toastError("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);
    try {
      await userClient.create(
        {
          email: form.email,
          name: form.name,
          password: form.password,
          role: form.role,
        },
        form.accountId
      );
      toastSuccess(isGlobal ? "Usuario creado exitosamente" : "Entrenador agregado exitosamente");
      onSuccess();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toastError(err.response?.data?.message || "Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">Nombre</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Nombre completo"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="email@ejemplo.com"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">Contraseña</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Mínimo 8 caracteres"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">Confirmar Contraseña</label>
          <input
            type="password"
            value={form.passwordConfirm}
            onChange={(e) => handleChange("passwordConfirm", e.target.value)}
            placeholder="Repetir contraseña"
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
          />
        </div>
      </div>

      {isGlobal && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-on-surface-variant">Rol</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleChange("role", "COACH")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-display transition-colors ${
                    form.role === "COACH"
                      ? "bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/30"
                      : "bg-surface-container-low text-on-surface-variant border border-outline-variant/30 hover:border-outline-variant/50"
                  }`}
                >
                  Coach
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("role", "ORG_ADMIN")}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-display transition-colors ${
                    form.role === "ORG_ADMIN"
                      ? "bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/30"
                      : "bg-surface-container-low text-on-surface-variant border border-outline-variant/30 hover:border-outline-variant/50"
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-on-surface-variant">Cuenta</label>
              <select
                value={form.accountId}
                onChange={(e) => handleChange("accountId", e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
              >
                {cuentas.map((cuenta) => (
                  <option key={cuenta.id} value={cuenta.id}>
                    {cuenta.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.email || !form.password}
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {loading ? "Creando..." : "Crear"}
        </Button>
      </div>
    </div>
  );
}