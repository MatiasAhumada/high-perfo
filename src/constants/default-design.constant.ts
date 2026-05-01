export const DEFAULT_DESIGN = {
  primaryColor: "#f8171a",
  surfaceColor: "#101417",
  surfaceVariant: "#1d2023",
  textColor: "#e0e2e6",
  fontFamilyHead: "Space Grotesk",
  fontFamilyBody: "Manrope",
  borderRadius: "0.5rem",
} as const;

export type DefaultDesign = typeof DEFAULT_DESIGN;
