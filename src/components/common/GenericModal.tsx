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
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
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
  const headerBgClass = isDark ? "bg-surface-container-lowest" : "bg-surface-container-low";
  const footerBgClass = isDark ? "bg-surface-container-lowest" : "bg-surface-container-low";

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
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className={cn(bgClass, "border border-outline-variant/30 rounded-lg shadow-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto", SIZE_CLASSES[size])}
            >
              <div
                className={cn("flex items-center justify-between p-6 border-b border-outline-variant/20", headerBgClass)}
              >
                <div>
                  <h2 className="text-lg font-display font-semibold text-on-surface">
                    {title}
                  </h2>
                  {description && (
                    <p className="text-sm text-on-surface-variant/60 mt-1">
                      {description}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="text-on-surface-variant/60 hover:text-on-surface hover:bg-surface-container-high"
                >
                  <Cancel01Icon size={20} />
                </Button>
              </div>
              <div className="p-6">{children}</div>
              {footer && (
                <div
                  className={cn("flex justify-end gap-2 p-6 border-t border-outline-variant/20", footerBgClass)}
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
