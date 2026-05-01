"use client";

import { ToolCard } from "./ToolCard";
import type { ToolMock } from "@/mocks";

interface ToolsCatalogProps {
  tools: ToolMock[];
  onToggle: (id: string) => void;
}

export function ToolsCatalog({ tools, onToggle }: ToolsCatalogProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <ToolCard
          key={tool.id}
          tool={tool}
          onToggle={onToggle}
          delay={index * 0.08}
        />
      ))}
    </div>
  );
}
