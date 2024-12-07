import React, { Suspense } from "react";
import SortSection from "./components/SortSection";

export default function AlbaListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <SortSection />

      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <div>로딩 중...</div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
