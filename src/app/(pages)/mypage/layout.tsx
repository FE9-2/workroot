import { Suspense } from "react";
import FilterBar from "./components/FilterBar";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-6 md:px-[72px] lg:px-[220px]">
        <Suspense fallback={<div>로딩 중...</div>}>
          <FilterBar />
          {children}
        </Suspense>
      </div>
    </div>
  );
}
