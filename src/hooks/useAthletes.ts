"use client";

import { useState, useEffect } from "react";
import { athletesMock } from "@/mocks";
import type { AthleteMock } from "@/mocks";

interface UseAthletesReturn {
  athletes: AthleteMock[];
  loading: boolean;
  error: string | null;
}

const SIMULATED_DELAY = 500;

export function useAthletes(): UseAthletesReturn {
  const [athletes, setAthletes] = useState<AthleteMock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setAthletes(athletesMock);
        setLoading(false);
      } catch {
        setError("Error al cargar atletas");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { athletes, loading, error };
}

interface UseAthleteByIdReturn {
  athlete: AthleteMock | null;
  loading: boolean;
  error: string | null;
}

export function useAthleteById(id: string): UseAthleteByIdReturn {
  const [athlete, setAthlete] = useState<AthleteMock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const found = athletesMock.find((a) => a.id === id);
        setAthlete(found ?? null);
        setLoading(false);
      } catch {
        setError("Error al cargar atleta");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, [id]);

  return { athlete, loading, error };
}
