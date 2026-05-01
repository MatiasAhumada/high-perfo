"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddCircleIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common";
import { GenericModal } from "@/components/common";
import { AthleteForm } from "@/components/forms";
import { useAthletes } from "@/hooks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { ROUTES } from "@/constants/routes";
import type { AthleteMock } from "@/mocks";
import { toastSuccess } from "@/utils/toast.util";
import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

export default function AthletesPage() {
  const { athletes, loading } = useAthletes();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const filteredAthletes = athletes.filter((athlete) => {
    const fullName = `${athlete.firstName} ${athlete.lastName}`.toLowerCase();
    return fullName.includes(search.toLowerCase());
  });

  const columns: Column<AthleteMock>[] = [
    {
      key: "firstName",
      label: UI_TEXTS.ATHLETES.FIRST_NAME,
      render: (athlete: AthleteMock) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center shrink-0">
            <span className="font-display font-semibold text-xs text-on-surface-variant">
              {athlete.firstName[0]}
              {athlete.lastName[0]}
            </span>
          </div>
          <span className="font-display font-medium text-sm sm:text-base">
            {athlete.firstName} {athlete.lastName}
          </span>
        </div>
      ),
    },
    {
      key: "position",
      label: UI_TEXTS.ATHLETES.POSITION,
      render: (athlete: AthleteMock) => (
        <span className="text-sm text-on-surface-variant">
          {athlete.position}
        </span>
      ),
    },
    {
      key: "sport",
      label: "Deporte",
      render: (athlete: AthleteMock) => (
        <span className="text-sm text-on-surface-variant hidden md:inline">
          {athlete.sport}
        </span>
      ),
    },
    {
      key: "latestAssessment",
      label: "Última Evaluación",
      render: (athlete: AthleteMock) => (
        <span className="text-sm font-body text-on-surface-variant/60 hidden sm:inline">
          {athlete.latestAssessment ?? "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-5 sm:space-y-6">
      <DataTable<AthleteMock>
        title={UI_TEXTS.ATHLETES.TITLE}
        subtitle={UI_TEXTS.ATHLETES.SUBTITLE}
        columns={columns}
        data={filteredAthletes}
        keyExtractor={(athlete) => athlete.id}
        loading={loading}
        searchPlaceholder={UI_TEXTS.ATHLETES.SEARCH_PLACEHOLDER}
        onSearch={setSearch}
        totalLabel={`${athletes.length} ${UI_TEXTS.COMMON.TOTAL.toLowerCase()}`}
        onRowClick={(athlete) =>
          router.push(`${ROUTES.ATHLETES}/${athlete.id}`)
        }
        actions={
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display gap-1.5 rounded-lg text-sm"
          >
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">
              {UI_TEXTS.ATHLETES.ADD_ATHLETE}
            </span>
          </Button>
        }
      />

      <GenericModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={UI_TEXTS.ATHLETES.ADD_ATHLETE}
        size="lg"
      >
        <AthleteForm
          onSubmit={() => {
            toastSuccess("Atleta creado exitosamente");
            setModalOpen(false);
          }}
        />
      </GenericModal>
    </div>
  );
}
