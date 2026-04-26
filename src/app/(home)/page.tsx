"use client";

import { StatsGrid, CoachTable } from "@/components/modules/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-6 w-full">
      <StatsGrid />
      <CoachTable />
    </div>
  );
}
