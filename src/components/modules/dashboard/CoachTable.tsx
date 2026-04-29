"use client";

import { useState } from "react";
import { MoreVerticalIcon, AddCircleIcon } from "hugeicons-react";
import { DataTable } from "@/components/common";
import { GenericModal } from "@/components/common";
import { StatusBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { AthleteForm } from "@/components/forms";
import { coachesMock } from "@/mocks";
import type { CoachMock } from "@/mocks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { toastSuccess } from "@/utils/toast.util";
import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

export function CoachTable() {
  const [addCoachModalOpen, setAddCoachModalOpen] = useState(false);

  const columns: Column<CoachMock>[] = [
    {
      key: "firstName",
      label: UI_TEXTS.DASHBOARD.COACH_NAME,
      render: (coach: CoachMock) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center shrink-0">
            <span className="font-display font-semibold text-xs text-on-surface-variant">
              {coach.firstName[0]}{coach.lastName[0]}
            </span>
          </div>
          <div>
            <p className="font-display font-medium text-on-surface">{coach.firstName} {coach.lastName}</p>
            <p className="text-xs text-on-surface-variant/40">{coach.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "active",
      label: UI_TEXTS.DASHBOARD.COACH_STATUS,
      render: (coach: CoachMock) => (
        <StatusBadge variant={coach.active ? "active" : "inactive"} />
      ),
    },
    {
      key: "assignedAthletes",
      label: UI_TEXTS.DASHBOARD.COACH_ASSIGNED_ATHLETES,
      render: (coach: CoachMock) => (
        <span className="text-data-mono font-data text-on-surface">
          {coach.assignedAthletes}/{coach.maxAthletes}
        </span>
      ),
    },
    {
      key: "specialty",
      label: UI_TEXTS.DASHBOARD.COACH_SPECIALTY,
      render: (coach: CoachMock) => (
        <span className="text-sm text-on-surface-variant">{coach.specialty}</span>
      ),
    },
    {
      key: "actions",
      label: UI_TEXTS.DASHBOARD.COACH_ACTIONS,
      render: () => (
        <Button variant="ghost" size="icon-xs" className="text-on-surface-variant/40 hover:text-on-surface-variant">
          <MoreVerticalIcon size={16} />
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable<CoachMock>
        title={UI_TEXTS.DASHBOARD.COACH_TABLE_TITLE}
        subtitle={UI_TEXTS.DASHBOARD.COACH_TABLE_SUBTITLE}
        columns={columns}
        data={coachesMock}
        keyExtractor={(coach) => coach.id}
        totalLabel={`${coachesMock.length} entrenadores registrados`}
        actions={
          <Button
            onClick={() => setAddCoachModalOpen(true)}
            className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg"
          >
            <AddCircleIcon size={16} />
            {UI_TEXTS.DASHBOARD.ADD_COACH}
          </Button>
        }
      />

      <GenericModal
        open={addCoachModalOpen}
        onOpenChange={setAddCoachModalOpen}
        title={UI_TEXTS.DASHBOARD.ADD_COACH}
        size="lg"
      >
        <AthleteForm
          onSubmit={() => {
            toastSuccess("Entrenador creado exitosamente");
            setAddCoachModalOpen(false);
          }}
        />
      </GenericModal>
    </>
  );
}
