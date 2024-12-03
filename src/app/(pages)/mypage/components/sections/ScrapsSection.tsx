"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "@/hooks/useUser";
import { useSortStore } from "@/store/sortStore";
import type { FormListType } from "@/types/response/form";

const SCRAPS_PER_PAGE = 10;

export default function ScrapsSection() {
  const { orderBy } = useSortStore();
  const { ref, inView } = useInView();
  const { useMyScraps } = useUser();

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyScraps({
    limit: SCRAPS_PER_PAGE,
    orderBy: orderBy.scrap,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">스크랩을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (!data?.pages[0]?.data?.length) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-gray-500">스크랩한 공고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((scrap: FormListType) => (
            <div key={scrap.id} className="rounded-lg border p-4">
              <h3 className="font-bold">{scrap.isPublic ? "공개" : "비공개"}</h3>
              <p className="text-gray-600"></p>
              <div className="mt-2 text-sm text-gray-500">
                <span>{scrap.title}</span>
                <span className="mx-2">•</span>
                <span>지원자 {scrap.applyCount}명</span>
                <span>스크랩 {scrap.scrapCount}명</span>
                <span>마감 {scrap.recruitmentEndDate.toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}

      {/* 무한 스크롤 트리거 */}
      {hasNextPage && (
        <div ref={ref} className="flex justify-center py-4">
          {isFetchingNextPage ? <div>로딩 중...</div> : <div className="h-4" />}
        </div>
      )}
    </div>
  );
}
