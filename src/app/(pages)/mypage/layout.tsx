import { Suspense } from "react";
import FilterBar from "./components/FilterBar";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full min-w-[327px] px-6 md:max-w-[600px] lg:max-w-[1480px]">
        <Suspense fallback={<LoadingSpinner />}>
          <FilterBar />
          {children}
        </Suspense>
      </div>
    </div>
  );
}
