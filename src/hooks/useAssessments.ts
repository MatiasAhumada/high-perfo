"use client";

import { useState, useEffect } from "react";
import { assessmentsMock } from "@/mocks";
import type { AssessmentMock } from "@/mocks";

interface UseAssessmentsReturn {
  assessments: AssessmentMock[];
  loading: boolean;
  error: string | null;
}

interface UseAssessmentByAthleteReturn {
  assessment: AssessmentMock | null;
  loading: boolean;
  error: string | null;
}

const SIMULATED_DELAY = 600;

export function useAssessments(): UseAssessmentsReturn {
  const [assessments, setAssessments] = useState<AssessmentMock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setAssessments(assessmentsMock);
        setLoading(false);
      } catch {
        setError("Error al cargar evaluaciones");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { assessments, loading, error };
}

export function useAssessmentByAthlete(
  athleteId: string,
): UseAssessmentByAthleteReturn {
  const [assessment, setAssessment] = useState<AssessmentMock | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const found = assessmentsMock.find((a) => a.athleteId === athleteId);
        setAssessment(found ?? null);
        setLoading(false);
      } catch {
        setError("Error al cargar evaluación");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, [athleteId]);

  return { assessment, loading, error };
}
