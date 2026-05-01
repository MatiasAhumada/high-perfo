"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

interface DataTableProps<T> {
  title: string;
  subtitle?: string;
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
  loading?: boolean;
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  actions?: ReactNode;
  totalLabel?: string;
  onRowClick?: (item: T) => void;
  expandedContent?: (item: T) => ReactNode;
}

const ALIGN_MAP: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function DataTable<T>({
  title,
  subtitle,
  columns,
  data,
  keyExtractor,
  emptyMessage = "No hay datos disponibles",
  loading = false,
  searchPlaceholder = "Buscar...",
  onSearch,
  actions,
  totalLabel,
  onRowClick,
}: DataTableProps<T>) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="font-display font-semibold text-lg sm:text-xl text-on-surface leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-on-surface-variant text-sm mt-1 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">{actions}</div>
        )}
      </div>

      <div className="bg-surface-container border border-outline-variant/30 rounded-lg overflow-hidden">
        {onSearch && (
          <div className="p-3 sm:p-5 border-b border-outline-variant/20">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search01Icon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
              />
              <Input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10 bg-surface-container-low border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/40 focus:border-on-tertiary-container focus:ring-on-tertiary-container/30 text-sm"
              />
            </div>
          </div>
        )}

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[600px] sm:min-w-[800px] border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-outline-variant/30 bg-surface-container-low/80 backdrop-blur-sm">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`font-data-mono text-xs sm:text-sm text-on-surface-variant py-3 sm:py-4 px-4 sm:px-6 font-medium whitespace-nowrap ${ALIGN_MAP[column.align ?? "left"] ?? "text-left"} ${column.className ?? ""}`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm sm:text-base text-on-surface divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-on-surface-variant/50 font-medium"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-on-tertiary-container border-t-transparent rounded-full animate-spin" />
                      <span className="hidden sm:inline">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-8 text-center text-on-surface-variant/50 font-medium"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <motion.tr
                    key={keyExtractor(item)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: shouldReduceMotion ? 0 : index * 0.03,
                    }}
                    onClick={() => onRowClick?.(item)}
                    className={`hover:bg-surface-container-high/40 transition-colors ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`py-3 sm:py-4 px-4 sm:px-6 font-medium text-on-surface whitespace-nowrap ${ALIGN_MAP[column.align ?? "left"] ?? "text-left"}`}
                      >
                        {column.render
                          ? column.render(item)
                          : String(
                              (item as Record<string, unknown>)[column.key] ??
                                "",
                            )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalLabel && (
          <div className="px-4 sm:px-6 py-3 border-t border-outline-variant/20">
            <p className="text-xs font-medium text-on-surface-variant/50 uppercase tracking-wider">
              {totalLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
