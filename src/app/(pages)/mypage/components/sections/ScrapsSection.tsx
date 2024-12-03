"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "@/hooks/useUser";
import { useSortStore } from "@/store/sortStore";
import type { FormListType } from "@/types/response/form";

// 한 페이지당 스크랩 수
const SCRAPS_PER_PAGE = 10;

export default function ScrapsSection() {
  // 정렬 상태 관리
  const { orderBy } = useSortStore();

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1, // 10% 정도 보이면 트리거
    triggerOnce: true, // 한 번만 트리거 (불필요한 API 호출 방지)
    rootMargin: "100px", // 하단 100px 전에 미리 로드
  });

  // 내가 스크랩한 알바폼 목록 조회
  const { useMyScraps } = useUser();
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyScraps({
    limit: SCRAPS_PER_PAGE,
    orderBy: orderBy.scrap,
  });

  // 스크롤이 하단에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">스크랩을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  // 데이터가 없는 경우 처리
  if (!data?.pages[0]?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-gray-500">스크랩한 공고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 스크랩 목록 렌더링 */}
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((scrap: FormListType) => (
            <div key={scrap.id} className="rounded-lg border p-4 transition-all hover:border-primary-orange-200">
              <h3 className="font-bold">{scrap.title}</h3>
              <div className="mt-2 text-sm text-gray-500">
                <span>지원자 {scrap.applyCount}명</span>
                <span className="mx-2">•</span>
                <span>스크랩 {scrap.scrapCount}명</span>
                <span className="mx-2">•</span>
                <span>마감 {new Date(scrap.recruitmentEndDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {/* 무한 스크롤 트리거 영역 */}
      <div ref={ref} className="h-4 w-full">
        {isFetchingNextPage && (
          <div className="flex justify-center py-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-orange-300 border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
