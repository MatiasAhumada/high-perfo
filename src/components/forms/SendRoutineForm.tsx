"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import type { AthleteMock } from "@/mocks";
import { toastSuccess } from "@/utils/toast.util";

interface SendRoutineFormProps {
  athletes: AthleteMock[];
  routineName: string;
}

export function SendRoutineForm({ athletes, routineName }: SendRoutineFormProps) {
  const [selectedAthletes, setSelectedAthletes] = useState<Set<string>>(new Set());

  const toggleAthlete = useCallback((id: string) => {
    setSelectedAthletes((prev: Set<string>) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSend = () => {
    toastSuccess(UI_TEXTS.SEND_ROUTINE.SUCCESS, {
      description: `${selectedAthletes.size} destinatario(s)`,
    });
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <p className="text-[10px] sm:text-xs text-on-surface-variant/50 mb-2">{UI_TEXTS.SEND_ROUTINE.SELECT_ATHLETES}</p>
        <p className="text-sm text-on-surface-variant/70 mb-4">
          Rutina: <span className="text-on-surface font-display font-medium">{routineName}</span>
        </p>
      </div>

      <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
        {athletes.map((athlete) => (
          <label
            key={athlete.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low border border-outline-variant/20 cursor-pointer hover:border-outline-variant/50 transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedAthletes.has(athlete.id)}
              onChange={() => toggleAthlete(athlete.id)}
              className="w-4 h-4 rounded-sm border-outline-variant text-on-tertiary-container focus:ring-on-tertiary-container/30 bg-surface-container shrink-0"
            />
            <span className="font-display text-sm text-on-surface truncate">
              {athlete.firstName} {athlete.lastName}
            </span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant/40 ml-auto shrink-0">
              {athlete.position}
            </span>
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          onClick={handleSend}
          disabled={selectedAthletes.size === 0}
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {UI_TEXTS.SEND_ROUTINE.CONFIRM_SEND}
        </Button>
      </div>
    </div>
  );
}