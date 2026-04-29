"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "active" | "inactive" | "warning";

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; text: string; dot: string; border: string; defaultLabel: string }> = {
  active: {
    bg: "bg-[#0f3d2b]",
    text: "text-[#4ade80]",
    dot: "bg-[#4ade80]",
    border: "border border-[#166534]",
    defaultLabel: "Activo",
  },
  inactive: {
    bg: "bg-error-container/30",
    text: "text-error",
    dot: "bg-on-tertiary-container",
    border: "border border-error-container",
    defaultLabel: "Inactivo",
  },
  warning: {
    bg: "bg-warning-container",
    text: "text-warning",
    dot: "bg-warning",
    border: "border border-warning/30",
    defaultLabel: "Alerta",
  },
};

export function StatusBadge({ variant, label, className }: StatusBadgeProps) {
  const style = VARIANT_STYLES[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider",
        style.bg,
        style.text,
        style.border,
        className
      )}
    >
      {label ?? style.defaultLabel}
    </span>
  );
}