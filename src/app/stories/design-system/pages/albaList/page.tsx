"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { filterRecruitingOptions } from "@/constants/filterOptions";
import { FormListType } from "@/types/response/form";
import AlbaListItem from "@/app/components/card/cardList/AlbaListItem";
import { fetchMockData, getInitialMockData } from "./mock/data";
import SortSection from "@/app/(pages)/albaList/components/SortSection";
import StorySearchSection from "../../components/SearchSection";
import Header from "../../components/layout/Header";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";

interface AlbaListProps {
  mockData?: FormListType[][];
  isLoading?: boolean;
  onInView?: () => void;
  scrollRef?: (node?: Element | null) => void;
}

const AlbaList: React.FC<AlbaListProps> = () => {
  const [items, setItems] = useState<FormListType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      const initialData = getInitialMockData();
      setItems(initialData.items);
      setHasMore(initialData.hasMore);
      setIsLoading(false);
    };
    loadInitialData();
  }, []);

  // 무한 스크롤
  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      const loadMoreData = async () => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        const nextData = fetchMockData(page + 1);
        setItems((prev) => [...prev, ...nextData.items]);
        setHasMore(nextData.hasMore);
        setPage((prev) => prev + 1);
        setIsLoading(false);
      };
      loadMoreData();
    }
  }, [inView, hasMore, page, isLoading]);

  // 로딩 상태 처리
  if (isLoading && items.length === 0) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col items-center">
        {/* 검색 섹션과 필터 드롭다운을 고정 위치로 설정 */}
        <div className="fixed left-0 right-0 top-16 z-40 bg-white shadow-sm">
          {/* 검색 섹션 */}
          <div className="w-full border-b border-grayscale-100">
            <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <StorySearchSection />
              </div>
            </div>
          </div>

          {/* 필터 드롭다운 섹션 */}
          <div className="w-full border-b border-grayscale-100">
            <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
              <FilterDropdown
                options={filterRecruitingOptions.map((option) => option.label)}
                initialValue="전체"
                onChange={() => {}}
              />
              <div className="flex items-center gap-4">
                <SortSection />
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="w-full pt-[224px]">
          {/* 폼 만들기 버튼 - 고정 위치 */}
          <div className="fixed bottom-[28%] right-8 z-[9999] translate-y-1/2 md:right-12 lg:right-16 xl:right-20">
            <Link
              href="/addForm"
              className="flex items-center gap-2 rounded-lg bg-[#FFB800] px-4 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#FFA800] md:px-6 md:text-lg"
            >
              <IoAdd className="size-6" />
              <span>폼 만들기</span>
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
              <p className="text-grayscale-500">등록된 알바 공고가 없습니다.</p>
            </div>
          ) : (
            <div className="mx-auto mt-4 w-full max-w-screen-2xl px-4 md:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-center gap-6">
                {items.map((form) => (
                  <div key={form.id}>
                    <AlbaListItem {...form} />
                  </div>
                ))}
              </div>

              {/* 무한 스크롤 트리거 영역 */}
              <div ref={ref} className="h-4 w-full">
                {isLoading && (
                  <div className="flex justify-center py-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-orange-300 border-t-transparent" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlbaList;
