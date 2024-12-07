"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useForms } from "@/hooks/queries/form/useForms";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { filterRecruitingOptions } from "@/constants/filterOptions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SortSection from "./components/SortSection";
import AlbaListItem from "@/app/components/card/cardList/AlbaListItem";

const FORMS_PER_PAGE = 10;

export default function AlbaList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 쿼리 파라미터에서 필터 상태 가져오기
  const isRecruiting = searchParams.get("isRecruiting");

  // 초기 마운트 시 필터 값 설정
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has("isRecruiting")) {
      params.set("isRecruiting", "true");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, []);

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  // 알바폼 목록 조회
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useForms({
    limit: FORMS_PER_PAGE,
    isRecruiting: isRecruiting === "true" ? true : isRecruiting === "false" ? false : undefined,
  });

  // 모집 여부 필터 변경 함수
  const handleRecruitingFilter = (selected: string) => {
    const option = filterRecruitingOptions.find((opt) => opt.label === selected);
    if (option) {
      const params = new URLSearchParams(searchParams);
      if (selected === "전체") {
        params.delete("isRecruiting");
      } else {
        params.set("isRecruiting", String(option.value));
      }
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // 현재 필터 상태에 따른 초기값 설정
  const getInitialRecruitingValue = (isRecruiting: string | null) => {
    if (!isRecruiting) return "전체";
    const option = filterRecruitingOptions.find((opt) => String(opt.value) === isRecruiting);
    return option?.label || "전체";
  };

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
        <p className="text-red-500">알바 목록을 불러오는데 실패했습니다.</p>
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

  return (
    <div className="space-y-4">
      {/* 필터 드롭다운 섹션 */}
      <div className="border-b border-grayscale-100 bg-white">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
          <FilterDropdown
            options={filterRecruitingOptions.map((option) => option.label)}
            initialValue={getInitialRecruitingValue(isRecruiting)}
            onChange={handleRecruitingFilter}
          />
          <SortSection />
        </div>
      </div>

      {/* 알바폼 목록 랜더링 */}
      {!data?.pages?.[0]?.data?.length ? (
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <p className="text-grayscale-500">등록된 알바 공고가 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-6 lg:px-8 2xl:grid-cols-3 2xl:gap-12">
            {data?.pages.map((page) => (
              <React.Fragment key={page.nextCursor}>
                {page.data.map((form) => (
                  <div key={form.id} className="w-full">
                    <AlbaListItem {...form} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* 무한 스크롤 트리거 영역 */}
          <div ref={ref} className="h-4 w-full">
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-orange-300 border-t-transparent" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
