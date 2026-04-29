"use client";

import { StatsGrid, CoachTable } from "@/components/modules/dashboard";
import { SuperAdminView } from "@/components/modules/super-admin/SuperAdminView";
import { useCurrentUser } from "@/hooks";

export default function DashboardPage() {
  const { role, isSuperAdmin, isAdminView, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (isSuperAdmin && isAdminView) {
    return <SuperAdminView />;
  }

  return (
    <div className="space-y-6 w-full">
      <StatsGrid />
      <CoachTable />
    </div>
  );
}