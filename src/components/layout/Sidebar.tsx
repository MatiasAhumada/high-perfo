"use client";

import { useState } from "react";
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
}: {
  item: (typeof SIDEBAR_ITEMS)[number];
  isActive: boolean;
}) {
  const IconComponent = ICON_MAP[item.icon];

  return (
    <Link href={item.path}>
      <div
        className={cn(
          "flex items-center gap-3 px-6 py-3 font-display text-sm antialiased transition-all",
          isActive
            ? "bg-on-tertiary-container/10 text-on-tertiary-container border-r-2 border-on-tertiary-container font-semibold"
            : "text-on-surface-variant hover:bg-surface-container-high/30 hover:text-on-surface"
        )}
      >
        {IconComponent && (
          <IconComponent
            size={20}
            className={cn(
              "shrink-0",
              isActive ? "text-on-tertiary-container" : "text-on-surface-variant"
            )}
          />
        )}
        <span>{item.label}</span>
      </div>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant/30">
      <div className="px-6 pt-8 pb-6">
        <h2 className="text-on-surface font-display font-bold text-display-lg uppercase tracking-tight">
          Performance
        </h2>
        <p className="text-on-surface-variant text-xs mt-1 font-body">
          Analista Senior
        </p>
      </div>
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto py-2">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          return <SidebarItem key={item.key} item={item} isActive={isActive} />;
        })}
      </nav>
      <div className="px-6 pb-6 pt-4 border-t border-outline-variant/20">
        <button className="w-full bg-on-tertiary-container text-on-surface font-display text-label-caps py-3 rounded transition-all hover:bg-on-tertiary-container/90 flex items-center justify-center gap-2 shadow-lg shadow-on-tertiary-container/20">
          <Download01Icon size={16} />
          {UI_TEXTS.DASHBOARD.EXPORT_KPIS}
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-surface-container border border-outline-variant"
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
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-64 z-50"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1 rounded text-on-surface-variant hover:text-on-surface z-10"
              >
                <Cancel01Icon size={18} />
              </button>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
