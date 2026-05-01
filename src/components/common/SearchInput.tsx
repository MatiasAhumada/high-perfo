"use client";

import { Search01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SearchInput({
  placeholder = "Buscar...",
  value,
  onChange,
  className,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search01Icon
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/40"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-container border border-outline-variant/30 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-on-tertiary-container focus:outline-none transition-colors font-body"
      />
    </div>
  );
}
