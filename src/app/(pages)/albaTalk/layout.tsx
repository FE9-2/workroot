import { Suspense } from "react";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

export default function AlbaTalkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
