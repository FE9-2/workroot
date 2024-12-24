"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import ModalLayout from "@/app/components/modal/ModalLayout";
import MouseTrail from "./components/mouseTrail/MouseTrail";
import ChannelTalk from "./components/layout/ChannelTalk";

const ReactQueryDevtools = dynamic(
  () => import("@tanstack/react-query-devtools").then((mod) => mod.ReactQueryDevtools),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 60 * 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  // 채널톡을 표시하지 않을 경로들
  const excludePaths = ["/login", "/signup", "/auth/callback"];
  const showChannelTalk = !excludePaths.some((path) => pathname.startsWith(path));

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        {children}
        <MouseTrail />
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
              zIndex: 10000,
            },
          }}
        />
        {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
        {showChannelTalk && <ChannelTalk />}
        <ModalLayout />
      </div>
    </QueryClientProvider>
  );
}
