"use client";

import { UsuariosView } from "@/components/modules/usuarios/UsuariosView";
import { useCurrentUser } from "@/hooks";
import { redirect } from "next/navigation";

export default function UsuariosPage() {
  const { role, isSuperAdmin, isOrgAdmin, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-12 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse" />
        <div className="h-64 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse" />
      </div>
    );
  }

  if (!isSuperAdmin && !isOrgAdmin) {
    redirect("/");
  }

  return <UsuariosView />;
}
