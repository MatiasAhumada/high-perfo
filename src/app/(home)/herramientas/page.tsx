"use client";

import { ToolsCatalog } from "@/components/modules/tools";
import { useTools } from "@/hooks";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

export default function HerramientasPage() {
  const { tools, loading, toggleTool } = useTools();

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-display text-on-surface">{UI_TEXTS.TOOLS.TITLE}</h2>
        <p className="text-sm text-on-surface-variant/50 mt-1 hidden sm:block">{UI_TEXTS.TOOLS.SUBTITLE}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-44 sm:h-48 rounded-xl bg-surface-container border border-outline-variant/30 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ToolsCatalog tools={tools} onToggle={toggleTool} />
      )}
    </div>
  );
}