"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

const REFETCH_INTERVAL = 5 * 60;
const REFETCH_ON_WINDOW_FOCUS = false;

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      refetchInterval={REFETCH_INTERVAL}
      refetchOnWindowFocus={REFETCH_ON_WINDOW_FOCUS}
    >
      {children}
    </SessionProvider>
  );
}
