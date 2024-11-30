import FilterBar from "@/app/components/layout/mypage/FilterBar";
import ContentLayout from "@/app/components/layout/mypage/ContentLayout";

interface MypageLayoutProps {
  children: React.ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <FilterBar />
      <ContentLayout>{children}</ContentLayout>
    </div>
  );
}
