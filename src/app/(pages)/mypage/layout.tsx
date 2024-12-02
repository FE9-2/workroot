import FilterBar from "@/app/components/layout/mypage/FilterBar";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-6 md:px-[72px] lg:px-[220px]">
        <FilterBar />
        {children}
      </div>
    </div>
  );
}
