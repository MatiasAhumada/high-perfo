"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cancel01Icon } from "hugeicons-react";
import { cn } from "@/lib/utils";

interface GenericModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  variant?: "default" | "dark";
}

const SIZE_CLASSES: Record<string, string> = {
  sm: "sm:max-w-sm md:max-w-lg",
  md: "sm:max-w-md md:max-w-xl",
  lg: "sm:max-w-lg md:max-w-2xl",
  xl: "sm:max-w-xl md:max-w-3xl",
  "2xl": "sm:max-w-2xl md:max-w-4xl",
  "4xl": "sm:max-w-3xl md:max-w-5xl",
};

export function GenericModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  variant = "default",
}: GenericModalProps) {
  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-surface-container-low" : "bg-surface-container";
  const headerBgClass = isDark
    ? "bg-surface-container-lowest"
    : "bg-surface-container-low";
  const footerBgClass = isDark
    ? "bg-surface-container-lowest"
    : "bg-surface-container-low";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring" as const,
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-auto lg:top-1/2 lg:-translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 z-50 flex items-start sm:items-center justify-center p-2 sm:p-4 pointer-events-none"
          >
            <div
              className={cn(
                bgClass,
                "border border-outline-variant/30 rounded-lg sm:rounded-xl shadow-2xl w-full h-full sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto",
                SIZE_CLASSES[size],
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-outline-variant/20 shrink-0",
                  headerBgClass,
                )}
              >
                <div className="pr-8 sm:pr-0 min-w-0">
                  <h2 className="text-base sm:text-lg font-display font-semibold text-on-surface truncate">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-sm text-on-surface-variant/60 mt-0.5 line-clamp-2 hidden sm:block">
                      {description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="absolute right-2 top-2 sm:static sm:right-auto sm:top-auto text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container-high shrink-0"
                >
                  <Cancel01Icon size={20} />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                {children}
              </div>
              {footer && (
                <div
                  className={cn(
                    "flex justify-end gap-2 px-4 py-3 sm:px-6 sm:py-4 border-t border-outline-variant/20 shrink-0",
                    footerBgClass,
                  )}
                >
                  {footer}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
