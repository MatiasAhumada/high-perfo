"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  DashboardSquare01Icon,
  RunningShoesIcon,
  GymnasticIcon,
  ToolsIcon,
  Setting06Icon,
  Download01Icon,
  Menu01Icon,
  Cancel01Icon,
} from "hugeicons-react";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { SIDEBAR_ITEMS } from "@/constants/routes";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  DashboardIcon: DashboardSquare01Icon,
  DirectionsRunIcon: RunningShoesIcon,
  FitnessIcon: GymnasticIcon,
  ToolboxIcon: ToolsIcon,
  SettingsIcon: Setting06Icon,
};

function SidebarItem({
  item,
  isActive,
  onClick,
}: {
  item: (typeof SIDEBAR_ITEMS)[number];
  isActive: boolean;
  onClick?: () => void;
}) {
  const IconComponent = ICON_MAP[item.icon];

  return (
    <Link
      href={item.path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 font-display text-sm antialiased transition-all duration-200",
        isActive
          ? "bg-on-tertiary-container/10 text-on-tertiary-container border-r-[3px] border-on-tertiary-container font-semibold"
          : "text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface"
      )}
    >
      {IconComponent && (
        <IconComponent
          size={20}
          className={cn("shrink-0", isActive ? "text-on-tertiary-container" : "text-on-surface-variant")}
        />
      )}
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant/30">
      <div className="px-5 pt-8 pb-6">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-on-surface tracking-tight">
          Perfo<span className="text-on-tertiary-container">rm</span>
        </h2>
        <p className="text-on-surface-variant text-xs mt-1 font-body">Analista Senior</p>
      </div>
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto py-2">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          return <SidebarItem key={item.key} item={item} isActive={isActive} onClick={closeMobile} />;
        })}
      </nav>
      <div className="px-5 pb-6 pt-4 border-t border-outline-variant/20">
        <button className="w-full bg-on-tertiary-container text-on-surface font-display text-label-caps py-3 rounded-lg transition-all hover:bg-on-tertiary-container/90 flex items-center justify-center gap-2 shadow-lg shadow-on-tertiary-container/20 active:scale-[0.98]">
          <Download01Icon size={16} />
          <span className="hidden sm:inline">{UI_TEXTS.DASHBOARD.EXPORT_KPIS}</span>
          <span className="sm:hidden">Export</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </div>

      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 rounded-lg bg-surface-container border border-outline-variant/40 shadow-lg"
      >
        <Menu01Icon size={20} className="text-on-surface" />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 sm:w-80 z-50"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="absolute inset-0 bg-black/10 pointer-events-none"
              />
              <div className="relative h-full">
                <button
                  onClick={closeMobile}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <Cancel01Icon size={20} />
                </button>
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}