"use client";

import { useState, useEffect } from "react";
import { statsMock } from "@/mocks";
import type { StatItemMock } from "@/mocks";

interface UseStatsReturn {
  stats: StatItemMock[];
  loading: boolean;
  error: string | null;
}

const SIMULATED_DELAY = 300;

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<StatItemMock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setStats(statsMock);
        setLoading(false);
      } catch {
        setError("Error al cargar estadísticas");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { stats, loading, error };
}
