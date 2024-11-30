"use client";

import { cn } from "@/lib/tailwindUtil";
import { usePathname } from "next/navigation";
import Link from "next/link";

const FilterBar = () => {
  const pathname = usePathname();

  const getLinkClassName = (path: string) => {
    return cn(
      "px-4 py-2 text-sm font-medium transition-colors sm:text-base",
      "hover:text-gray-900",
      pathname === path ? "border-b-2 border-primary-orange-300 text-gray-900" : "text-gray-500"
    );
  };

  return (
    <div className="w-full bg-white">
      {/* 마이페이지 섹션 */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="py-4 text-xl font-bold text-gray-900 sm:py-6 sm:text-2xl">마이페이지</h1>
        </div>
      </div>

      {/* 탭 메뉴 섹션 */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto flex space-x-4 px-4 sm:space-x-8">
          <Link href="/mypage/posts" className={getLinkClassName("/mypage/posts")}>
            내가 쓴 글
          </Link>
          <Link href="/mypage/comments" className={getLinkClassName("/mypage/comments")}>
            내가 쓴 댓글
          </Link>
          <Link href="/mypage/scrap" className={getLinkClassName("/mypage/scrap")}>
            스크랩
          </Link>
          <div className="flex-1" /> {/* 오른쪽 정렬을 위한 공간 */}
          <div className="flex items-center">
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900">최신순</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default FilterBar;
