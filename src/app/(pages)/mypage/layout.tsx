import { Suspense } from "react";
import FilterBar from "./components/FilterBar";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="mx-auto flex w-full min-w-[327px] flex-col px-6 md:max-w-[600px] lg:max-w-[1480px]">
      <Suspense fallback={<LoadingSpinner />}>
        <FilterBar />
        {children}
      </Suspense>
    </div>
  );
}
