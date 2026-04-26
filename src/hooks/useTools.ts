"use client";

import { useState, useEffect } from "react";
import { toolsMock } from "@/mocks";
import type { ToolMock } from "@/mocks";

interface UseToolsReturn {
  tools: ToolMock[];
  loading: boolean;
  error: string | null;
  toggleTool: (toolId: string) => void;
}

const SIMULATED_DELAY = 350;

export function useTools(): UseToolsReturn {
  const [tools, setTools] = useState<ToolMock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setTools(toolsMock);
        setLoading(false);
      } catch {
        setError("Error al cargar herramientas");
        setLoading(false);
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const toggleTool = (toolId: string) => {
    setTools((prev) =>
      prev.map((tool) =>
        tool.id === toolId ? { ...tool, active: !tool.active } : tool
      )
    );
  };

  return { tools, loading, error, toggleTool };
}
