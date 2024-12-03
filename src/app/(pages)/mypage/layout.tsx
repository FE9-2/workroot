import { Suspense } from "react";
import FilterBar from "./components/FilterBar";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full min-w-[327px] px-6 md:min-w-[600px] lg:min-w-[1480px]">
        <Suspense fallback={<div>로딩 중...</div>}>
          <FilterBar />
          {children}
        </Suspense>
      </div>
    </div>
  );
}
