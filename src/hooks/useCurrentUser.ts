import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { ROUTES } from "@/constants/routes";

const STORAGE_KEY = "superAdminView";

export function useCurrentUser() {
  const { data: session, status } = useSession();
  const [isAdminView, setIsAdminView] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.role !== "SUPER_ADMIN") {
      return;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setIsAdminView(saved === "admin");
    }
  }, [session?.user?.role]);

  const toggleView = () => {
    const newValue = !isAdminView;
    setIsAdminView(newValue);
    localStorage.setItem(STORAGE_KEY, newValue ? "admin" : "coach");
    
    if (newValue) {
      router.push(ROUTES.ACCOUNTS);
    } else {
      router.push(ROUTES.ATHLETES);
    }
  };

  const setAdminView = (value: boolean) => {
    setIsAdminView(value);
    localStorage.setItem(STORAGE_KEY, value ? "admin" : "coach");
  };

  return useMemo(
    () => ({
      user: session?.user,
      role: session?.user?.role as Role | undefined,
      accountId: session?.user?.accountId,
      isLoading: status === "loading",
      isAuthenticated: status === "authenticated",
      isSuperAdmin: session?.user?.role === "SUPER_ADMIN",
      isOrgAdmin: session?.user?.role === "ORG_ADMIN",
      isCoach: session?.user?.role === "COACH",
      isAdminView: isAdminView,
      setAdminView,
      toggleView,
    }),
    [session, status, isAdminView, toggleView],
  );
}
