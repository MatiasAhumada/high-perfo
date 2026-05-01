"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { accountClient } from "@/services/account.service";
import { toastSuccess, toastError } from "@/utils/toast.util";

interface CrearVentaFormProps {
  onSuccess: () => void;
}

export function CrearVentaForm({ onSuccess }: CrearVentaFormProps) {
  const [loading, setLoading] = useState(false);
  const [isOrganization, setIsOrganization] = useState(true);

  const [form, setForm] = useState({
    accountName: "",
    userEmail: "",
    userName: "",
    userPassword: "",
    userPasswordConfirm: "",
    maxCoaches: 1,
    maxAthletes: 10,
  });

  const handleChange = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (form.userPassword !== form.userPasswordConfirm) {
      toastError("Las contraseñas no coinciden");
      return;
    }

    if (!isOrganization && form.maxCoaches !== 0) {
      handleChange("maxCoaches", 0);
    }

    setLoading(true);
    try {
      await accountClient.createWithUser({
        accountName: form.accountName,
        isOrganization,
        maxCoaches: isOrganization ? form.maxCoaches : 0,
        maxAthletes: form.maxAthletes,
        userEmail: form.userEmail,
        userName: form.userName,
        userPassword: form.userPassword,
        userRole: isOrganization ? "ORG_ADMIN" : "ORG_ADMIN",
      });
      toastSuccess("Venta creada exitosamente");
      onSuccess();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toastError(err.response?.data?.message || "Error al crear la venta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">
            Nombre de la Cuenta
          </label>
          <input
            type="text"
            value={form.accountName}
            onChange={(e) => handleChange("accountName", e.target.value)}
            placeholder={isOrganization ? "Nombre del Club" : "Tu Nombre"}
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">Tipo</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOrganization(true);
                handleChange("maxCoaches", 1);
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-display transition-colors ${
                isOrganization
                  ? "bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/30"
                  : "bg-surface-container-low text-on-surface-variant border border-outline-variant/30 hover:border-outline-variant/50"
              }`}
            >
              Club / Organización
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOrganization(false);
                handleChange("maxCoaches", 0);
              }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-display transition-colors ${
                !isOrganization
                  ? "bg-on-tertiary-container/10 text-on-tertiary-container border border-on-tertiary-container/30"
                  : "bg-surface-container-low text-on-surface-variant border border-outline-variant/30 hover:border-outline-variant/50"
              }`}
            >
              Coach Individual
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">
            Límite Coaches
          </label>
          <input
            type="number"
            min={isOrganization ? 1 : 0}
            max={50}
            value={form.maxCoaches}
            onChange={(e) =>
              handleChange("maxCoaches", parseInt(e.target.value) || 0)
            }
            disabled={!isOrganization}
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-on-surface-variant">
            Límite Atletas
          </label>
          <input
            type="number"
            min={1}
            max={500}
            value={form.maxAthletes}
            onChange={(e) =>
              handleChange("maxAthletes", parseInt(e.target.value) || 1)
            }
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="border-t border-outline-variant/20 pt-4">
        <h4 className="text-sm font-display text-on-surface mb-4">
          Usuario Inicial
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs text-on-surface-variant">Nombre</label>
            <input
              type="text"
              value={form.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              placeholder="Nombre completo"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-on-surface-variant">Email</label>
            <input
              type="email"
              value={form.userEmail}
              onChange={(e) => handleChange("userEmail", e.target.value)}
              placeholder="email@ejemplo.com"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="text-xs text-on-surface-variant">
              Contraseña
            </label>
            <input
              type="password"
              value={form.userPassword}
              onChange={(e) => handleChange("userPassword", e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-on-surface-variant">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={form.userPasswordConfirm}
              onChange={(e) =>
                handleChange("userPasswordConfirm", e.target.value)
              }
              placeholder="Repetir contraseña"
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-lg px-4 py-2.5 text-on-surface focus:border-on-tertiary-container focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          onClick={handleSubmit}
          disabled={
            loading ||
            !form.accountName ||
            !form.userEmail ||
            !form.userName ||
            !form.userPassword
          }
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {loading ? "Creando..." : "Crear Venta"}
        </Button>
      </div>
    </div>
  );
}
