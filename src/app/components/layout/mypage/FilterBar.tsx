"use client";

import { cn } from "@/lib/tailwindUtil";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { postSortOptions } from "@/constants/postOptions";
import { formSortOptions } from "@/constants/formOptions";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { useSortStore } from "@/store/sortStore";
import { useEffect } from "react";

const TABS = [
  { name: "내가 쓴 글", path: "/mypage/posts" },
  { name: "내가 쓴 댓글", path: "/mypage/comments" },
  { name: "스크랩", path: "/mypage/scrap" },
] as const;

// 페이지별 정렬 옵션 정의
const SORT_OPTIONS = {
  posts: [
    { label: "최신순", value: postSortOptions.MOST_RECENT },
    { label: "댓글순", value: postSortOptions.MOST_COMMENTED },
    { label: "좋아요순", value: postSortOptions.MOST_LIKED },
  ],
  comments: [{ label: "최신순", value: postSortOptions.MOST_RECENT }],
  scrap: [
    { label: "최신순", value: formSortOptions.MOST_RECENT },
    { label: "시급높은순", value: formSortOptions.HIGHEST_WAGE },
    { label: "지원자 많은순", value: formSortOptions.MOST_APPLIED },
    { label: "스크랩 많은순", value: formSortOptions.MOST_SCRAPPED },
  ],
} as const;

// 탭이지별 기본 정렬 옵션 추가
const DEFAULT_SORT_VALUES = {
  posts: postSortOptions.MOST_RECENT,
  comments: postSortOptions.MOST_RECENT,
  scrap: formSortOptions.MOST_RECENT,
} as const;

// 탭 메뉴 컴포넌트
const TabMenu = () => {
  const pathname = usePathname();

  const getLinkClassName = (path: string) => {
    return cn(
      "py-4 py-2 text-sm font-medium transition-colors sm:text-base",
      "hover:text-gray-900",
      pathname === path ? "border-b-2 border-primary-orange-300 text-gray-900" : "text-gray-500"
    );
  };

  return (
    <div className="flex space-x-4 sm:space-x-8">
      {TABS.map((tab) => (
        <Link key={tab.path} href={tab.path} className={getLinkClassName(tab.path)}>
          {tab.name}
        </Link>
      ))}
    </div>
  );
};

// 정렬 섹션 컴포넌트
const SortSection = ({ pageType }: { pageType: keyof typeof SORT_OPTIONS }) => {
  const { orderBy, setOrderBy } = useSortStore();
  const options = SORT_OPTIONS[pageType];
  const currentLabel = options.find((opt) => opt.value === orderBy[pageType])?.label || options[0].label;
  const isReadOnly = pageType === "comments";

  // pageType이 변경될 때마다 해당 탭의 기본값으로 초기화
  useEffect(() => {
    setOrderBy(pageType, DEFAULT_SORT_VALUES[pageType]);
  }, [pageType, setOrderBy]);

  const handleSortChange = (selected: string) => {
    const option = options.find((opt) => opt.label === selected);
    if (option) {
      setOrderBy(pageType, option.value);
    }
  };

  return (
    <div className="my-2 flex justify-end lg:my-4">
      <FilterDropdown
        options={options.map((option) => option.label)}
        className="!w-28 md:!w-40"
        initialValue={currentLabel}
        onChange={handleSortChange}
        readOnly={isReadOnly}
      />
    </div>
  );
};

const FilterBar = () => {
  const pathname = usePathname();
  const pageType = pathname.includes("posts")
    ? "posts"
    : pathname.includes("comments")
      ? "comments"
      : pathname.includes("scrap")
        ? "scrap"
        : "posts";

  return (
    <div className="w-full bg-white">
      {/* 마이페이지 섹션 */}
      <div className="border-b border-gray-200">
        <div>
          <h1 className="py-4 text-xl font-bold text-gray-900 sm:py-6 sm:text-2xl">마이페이지</h1>
        </div>
      </div>

      {/* 탭 메뉴 섹션 */}
      <nav className="border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <TabMenu />
          <SortSection pageType={pageType} />
        </div>
      </nav>
    </div>
  );
};

export default FilterBar;
