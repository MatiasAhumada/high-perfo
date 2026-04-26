"use client";

import { motion } from "framer-motion";
import { UI_TEXTS } from "@/constants/ui-texts.constant";

interface VisualConfigSectionProps {
  primaryColor: string;
  surfaceColor: string;
  textColor: string;
  borderRadius: string;
  onPrimaryColorChange: (value: string) => void;
  onSurfaceColorChange: (value: string) => void;
  onTextColorChange: (value: string) => void;
  onBorderRadiusChange: (value: string) => void;
  delay?: number;
}

export function VisualConfigSection({
  primaryColor,
  surfaceColor,
  textColor,
  borderRadius,
  onPrimaryColorChange,
  onSurfaceColorChange,
  onTextColorChange,
  onBorderRadiusChange,
  delay = 0,
}: VisualConfigSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-surface-container border border-outline-variant/30 rounded-lg p-6 space-y-6"
    >
      <h3 className="font-display font-semibold text-on-surface">{UI_TEXTS.SETTINGS.VISUAL_CONFIG}</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-label-caps text-on-surface-variant/50 block mb-1">{UI_TEXTS.SETTINGS.PRIMARY_COLOR}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg border border-outline-variant/30 cursor-pointer bg-transparent"
            />
            <span className="text-data-mono font-data text-on-surface-variant/60">{primaryColor}</span>
          </div>
        </div>
        <div>
          <label className="text-label-caps text-on-surface-variant/50 block mb-1">{UI_TEXTS.SETTINGS.SURFACE_COLOR}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={surfaceColor}
              onChange={(e) => onSurfaceColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg border border-outline-variant/30 cursor-pointer bg-transparent"
            />
            <span className="text-data-mono font-data text-on-surface-variant/60">{surfaceColor}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-label-caps text-on-surface-variant/50 block mb-1">{UI_TEXTS.SETTINGS.TEXT_COLOR}</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={textColor}
              onChange={(e) => onTextColorChange(e.target.value)}
              className="w-10 h-10 rounded-lg border border-outline-variant/30 cursor-pointer bg-transparent"
            />
            <span className="text-data-mono font-data text-on-surface-variant/60">{textColor}</span>
          </div>
        </div>
        <div>
          <label className="text-label-caps text-on-surface-variant/50 block mb-1">{UI_TEXTS.SETTINGS.BORDER_RADIUS}</label>
          <input
            type="range"
            min="0"
            max="24"
            value={borderRadius}
            onChange={(e) => onBorderRadiusChange(e.target.value)}
            className="w-full accent-on-tertiary-container"
          />
          <span className="text-data-mono font-data text-on-surface-variant/60">{borderRadius}px</span>
        </div>
      </div>

      <div className="pt-2">
        <div
          className="rounded-lg p-4 border border-outline-variant/20 space-y-2"
          style={{
            backgroundColor: surfaceColor,
            borderRadius: `${borderRadius}px`,
          }}
        >
          <p style={{ color: primaryColor }} className="font-display font-bold">Vista Previa</p>
          <p style={{ color: textColor }} className="text-sm">Texto de ejemplo con la configuración seleccionada</p>
          <button
            style={{
              backgroundColor: primaryColor,
              color: surfaceColor,
              borderRadius: `${borderRadius}px`,
            }}
            className="px-4 py-2 text-sm font-display font-medium"
          >
            Botón de prueba
          </button>
        </div>
      </div>
    </motion.section>
  );
}
