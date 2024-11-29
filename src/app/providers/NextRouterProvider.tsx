"use client";

import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const createRouter = () => ({
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  refresh: () => Promise.resolve(),
  prefetch: () => Promise.resolve(),
  back: () => Promise.resolve(),
  forward: () => Promise.resolve(),
  pathname: "/",
  isFallback: false,
});

export function NextRouterProvider({ children }: { children: React.ReactNode }) {
  return <AppRouterContext.Provider value={createRouter()}>{children}</AppRouterContext.Provider>;
}
