"use client";

import { use } from "react";
import { useAthleteById } from "@/hooks";
import { useAssessmentByAthlete } from "@/hooks";
import { AthleteHeader, PowerKineticsPanel, AsymmetryPanel, ForceVelocityPanel } from "@/components/modules/athlete";

export default function AthleteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { athlete, loading: athleteLoading } = useAthleteById(id);
  const { assessment, loading: assessmentLoading } = useAssessmentByAthlete(id);

  if (athleteLoading || assessmentLoading) {
    return (
      <div className="space-y-6">
        <div className="h-24 rounded-lg bg-surface-container border border-outline-variant/30 animate-pulse" />
        <div className="h-80 rounded-lg bg-surface-container border border-outline-variant/30 animate-pulse" />
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-on-surface-variant/60">Atleta no encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AthleteHeader athlete={athlete} />

      {assessment ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <PowerKineticsPanel assessment={assessment} />
          </div>
          <div className="col-span-12 lg:col-span-4">
            <AsymmetryPanel assessment={assessment} />
          </div>
          <div className="col-span-12">
            <ForceVelocityPanel assessment={assessment} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-on-surface-variant/60">Sin evaluaciones registradas</p>
        </div>
      )}
    </div>
  );
}
