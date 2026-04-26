"use client";

import { useState, useEffect } from "react";
import { routinesMock } from "@/mocks";
import type { RoutineTemplateMock } from "@/mocks";

interface UseRoutinesReturn {
  routines: RoutineTemplateMock[];
  loading: boolean;
  error: string | null;
}

const SIMULATED_DELAY = 400;

export function useRoutines(): UseRoutinesReturn {
  const [routines, setRoutines] = useState<RoutineTemplateMock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setRoutines(routinesMock);
        setLoading(false);
      } catch {
        setError("Error al cargar rutinas");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { routines, loading, error };
}
