"use client";

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { filterRecruitingOptions } from "@/constants/filterOptions";
import { FormListType } from "@/types/response/form";
import AlbaListItem from "@/app/components/card/cardList/AlbaListItem";
import { fetchMockData, getInitialMockData } from "./mock/data";
import SortSection from "@/app/(pages)/albaList/components/SortSection";

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
    threshold: 0,
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
    <div className="space-y-4">
      {/* 필터 드롭다운 섹션 */}
      <div className="border-b border-grayscale-100 bg-white">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
          <FilterDropdown
            options={filterRecruitingOptions.map((option) => option.label)}
            initialValue="전체"
            onChange={() => {}}
          />
          <SortSection />
        </div>
      </div>

      {/* 알바폼 목록 랜더링 */}
      {items.length === 0 ? (
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <p className="text-grayscale-500">등록된 알바 공고가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-2 lg:px-8 2xl:grid-cols-3 2xl:gap-12">
            {items.map((form) => (
              <div key={form.id} className="w-full">
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
        </>
      )}
    </div>
  );
};

export default AlbaList;
