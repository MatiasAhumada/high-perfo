"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search01Icon,
  Notification01Icon,
  HelpCircleIcon,
  AddCircleIcon,
  Cancel01Icon,
  UserIcon,
  Logout01Icon,
} from "hugeicons-react";
import { UI_TEXTS } from "@/constants/ui-texts.constant";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function Header({ title }: HeaderProps) {
  const router = useRouter();
  const { user } = useCurrentUser();
  const headerTitle = title ?? UI_TEXTS.APP_TITLE;
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const supportRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const notifications: Notification[] = [];

  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AG";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        supportRef.current &&
        !supportRef.current.contains(event.target as Node)
      ) {
        setSupportOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push(ROUTES.LOGIN);
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-surface-container border-b border-outline-variant/30">
        <div className="flex items-center gap-3 sm:gap-4 ml-10 sm:ml-12 lg:ml-0">
          <h2 className="font-display font-semibold text-lg sm:text-xl text-on-surface tracking-tight truncate max-w-[200px] sm:max-w-none">
            {headerTitle}
          </h2>
        </div>

        <div className="hidden md:flex items-center relative flex-1 max-w-md mx-4 lg:mx-8">
          <Search01Icon
            size={16}
            className="absolute left-3 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="Buscar atleta, rutina, métrica..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:border-on-tertiary-container focus:outline-none transition-colors font-body"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 border-l border-outline-variant/30 pl-3 sm:pl-4 lg:pl-6">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setNotificationsOpen(true)}
            className="text-on-surface-variant hover:text-on-surface transition-colors relative"
          >
            <Notification01Icon size={18} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-on-tertiary-container rounded-full" />
            )}
          </Button>

          <div className="relative" ref={supportRef}>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setSupportOpen(!supportOpen)}
              className="hidden sm:flex text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <HelpCircleIcon size={18} />
            </Button>
            <AnimatePresence>
              {supportOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-surface-container border border-outline-variant/30 rounded-lg shadow-lg p-4 z-50"
                >
                  <h3 className="font-display font-semibold text-sm text-on-surface mb-2">
                    Contacta con Soporte
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-3">
                    High-Perfo
                  </p>
                  <div className="flex items-center gap-2 text-sm text-on-surface">
                    <span className="text-on-surface-variant">Teléfono:</span>
                    <a
                      href="tel:+541234567890"
                      className="text-on-tertiary-container hover:underline"
                    >
                      +54 1234567890
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="h-8 w-8 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden ml-1 cursor-pointer hover:border-outline transition-colors"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-display font-semibold text-[10px] text-secondary-brand">
                  {userInitials}
                </span>
              </div>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-surface-container border border-outline-variant/30 rounded-lg shadow-lg overflow-hidden z-50"
                >
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/perfil");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <UserIcon size={16} className="text-on-surface-variant" />
                    Ver Perfil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-on-tertiary-container hover:bg-surface-container-high transition-colors border-t border-outline-variant/20"
                  >
                    <Logout01Icon size={16} />
                    Cerrar Sesión
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button
            size="sm"
            onClick={() => router.push(ROUTES.TESTS)}
            className="bg-on-tertiary-container hover:bg-on-tertiary-container/90 text-on-surface font-display font-semibold gap-1.5 rounded-lg shadow-lg shadow-on-tertiary-container/20"
          >
            <AddCircleIcon size={16} />
            <span className="hidden sm:inline">Nueva Medición</span>
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {notificationsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setNotificationsOpen(false)}
            />
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-surface-container border-l border-outline-variant/30 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
                <h2 className="text-xl font-display font-semibold text-on-surface">
                  Notificaciones
                </h2>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  <Cancel01Icon size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Notification01Icon
                      size={48}
                      className="text-on-surface-variant/30 mb-4"
                    />
                    <p className="text-sm text-on-surface-variant">
                      No tienes notificaciones
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={cn(
                          "p-4 rounded-lg border transition-colors cursor-pointer",
                          notif.read
                            ? "bg-surface-container-low border-outline-variant/20"
                            : "bg-surface-container-high border-on-tertiary-container/20",
                        )}
                      >
                        <h3 className="font-display font-semibold text-sm text-on-surface mb-1">
                          {notif.title}
                        </h3>
                        <p className="text-xs text-on-surface-variant mb-2">
                          {notif.message}
                        </p>
                        <span className="text-xs text-on-surface-variant/60">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
