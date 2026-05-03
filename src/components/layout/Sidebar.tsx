"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  DashboardSquare01Icon,
  RunningShoesIcon,
  GymnasticIcon,
  ToolsIcon,
  Setting06Icon,
  Menu01Icon,
  Cancel01Icon,
  UserGroupIcon,
  Building06Icon,
  CreditCardIcon,
  ChartIcon,
  Dumbbell01Icon,
  ClipboardIcon,
  Logout01Icon,
} from "hugeicons-react";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import {
  SIDEBAR_ITEMS_SUPER_ADMIN_COACH,
  SIDEBAR_ITEMS_SUPER_ADMIN_ADMIN,
} from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks";

const ICON_MAP: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  DashboardIcon: DashboardSquare01Icon,
  DirectionsRunIcon: RunningShoesIcon,
  FitnessIcon: Dumbbell01Icon,
  ToolboxIcon: ToolsIcon,
  SettingsIcon: Setting06Icon,
  UserGroupIcon: UserGroupIcon,
  AccountIcon: Building06Icon,
  PlanIcon: CreditCardIcon,
  MetricIcon: ChartIcon,
  TestIcon: ClipboardIcon,
  RoutineIcon: GymnasticIcon,
};

function SidebarItem({
  item,
  isActive,
  onClick,
  iconComponent: IconComponent,
}: {
  item: { key: string; label: string; path: string; icon: string };
  isActive: boolean;
  onClick?: () => void;
  iconComponent?: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Link
      href={item.path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 font-display text-sm antialiased transition-all duration-200",
        isActive
          ? "bg-on-tertiary-container/10 text-on-tertiary-container border-r-[3px] border-on-tertiary-container font-semibold"
          : "text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface",
      )}
    >
      {IconComponent && (
        <IconComponent
          size={20}
          className={cn(
            "shrink-0",
            isActive ? "text-on-tertiary-container" : "text-on-surface-variant",
          )}
        />
      )}
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isSuperAdmin, isAdminView, toggleView } = useCurrentUser();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const items = isSuperAdmin
    ? isAdminView
      ? SIDEBAR_ITEMS_SUPER_ADMIN_ADMIN
      : SIDEBAR_ITEMS_SUPER_ADMIN_COACH
    : [];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-surface-container-lowest border-r border-outline-variant/30">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-on-surface tracking-tight">
            Perfo<span className="text-on-tertiary-container">rm</span>
          </h2>
        </div>
      </div>

      {isSuperAdmin && (
        <div className="px-5 mb-4">
          <div className="relative flex items-center gap-2 bg-surface-container rounded-lg p-1">
            <motion.div
              className="absolute inset-y-1 w-[calc(50%-4px)] bg-on-tertiary-container rounded-md"
              initial={false}
              animate={{
                x: isAdminView ? "calc(100% + 8px)" : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
            <button
              onClick={() => isAdminView && toggleView()}
              className={cn(
                "relative z-10 flex-1 py-2 px-3 rounded-md text-xs font-display font-semibold transition-colors duration-200",
                !isAdminView
                  ? "text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface",
              )}
            >
              Coach
            </button>
            <button
              onClick={() => !isAdminView && toggleView()}
              className={cn(
                "relative z-10 flex-1 py-2 px-3 rounded-md text-xs font-display font-semibold transition-colors duration-200",
                isAdminView
                  ? "text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface",
              )}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto py-2">
        {items.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const iconComponent = ICON_MAP[item.icon];
          return (
            <SidebarItem
              key={item.key}
              item={item}
              isActive={isActive}
              onClick={closeMobile}
              iconComponent={iconComponent}
            />
          );
        })}
      </nav>

      <div className="px-5 pb-6 pt-4 border-t border-outline-variant/20">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-surface-container-high border border-outline-variant/40 flex items-center justify-center shrink-0">
              <span className="font-display font-semibold text-xs text-on-surface-variant">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-display font-medium text-on-surface truncate">
                {user?.name}
              </p>
              <p className="text-xs text-on-surface-variant">
                {user?.role === "SUPER_ADMIN" ? "Super Admin" : user?.role}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg hover:bg-surface-container-high transition-colors shrink-0"
            title="Cerrar sesión"
          >
            <Logout01Icon size={18} className="text-on-surface-variant" />
          </button>
        </div>
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
