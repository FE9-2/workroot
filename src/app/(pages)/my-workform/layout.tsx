import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import React, { Suspense } from "react";

export default function MyAlbaFormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
    </div>
  );
}
