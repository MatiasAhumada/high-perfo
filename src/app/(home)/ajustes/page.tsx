"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileSection, AccountSection, VisualConfigSection } from "@/components/modules/settings";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { toastSuccess } from "@/utils/toast.util";

const DEFAULT_PRIMARY_COLOR = "#f8171a";
const DEFAULT_SURFACE_COLOR = "#101417";
const DEFAULT_TEXT_COLOR = "#e0e2e6";
const DEFAULT_BORDER_RADIUS = "8";

export default function AjustesPage() {
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [surfaceColor, setSurfaceColor] = useState(DEFAULT_SURFACE_COLOR);
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
  const [borderRadius, setBorderRadius] = useState(DEFAULT_BORDER_RADIUS);

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-headline-md font-display text-on-surface">{UI_TEXTS.SETTINGS.TITLE}</h2>
      </div>

      <ProfileSection delay={0.1} />
      <AccountSection delay={0.2} />
      <VisualConfigSection
        primaryColor={primaryColor}
        surfaceColor={surfaceColor}
        textColor={textColor}
        borderRadius={borderRadius}
        onPrimaryColorChange={setPrimaryColor}
        onSurfaceColorChange={setSurfaceColor}
        onTextColorChange={setTextColor}
        onBorderRadiusChange={setBorderRadius}
        delay={0.3}
      />

      <div className="flex justify-end">
        <Button
          onClick={() => toastSuccess("Ajustes guardados exitosamente")}
          className="bg-on-tertiary-container text-on-surface hover:bg-on-tertiary-container/90 font-display rounded-lg"
        >
          {UI_TEXTS.ACTIONS.SAVE}
        </Button>
      </div>
    </div>
  );
}
