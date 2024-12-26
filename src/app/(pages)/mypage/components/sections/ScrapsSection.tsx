"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMyScraps } from "@/hooks/queries/user/me/useMyScraps";
import { useMySortStore } from "@/store/mySortStore";
import type { FormListType } from "@/types/response/form";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { filterPublicOptions, filterRecruitingOptions } from "@/constants/filterOptions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import AlbaListItem from "@/app/components/card/cardList/AlbaListItem";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import Link from "next/link";
import ContentSection from "@/app/components/layout/ContentSection";
import ScrollTopButton from "@/app/components/button/default/ScrollTopButton";

const SCRAPS_PER_PAGE = 10;

export default function ScrapsSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 쿼리 파라미터에서 필터 상태 가져오기
  const isPublic = searchParams.get("isPublic");
  const isRecruiting = searchParams.get("isRecruiting");
  const { orderBy } = useMySortStore();

  // 초기 마운트 시 필터 값 설정
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let needsUpdate = false;

    if (!params.has("isPublic")) {
      params.set("isPublic", "true");
      needsUpdate = true;
    }
    if (!params.has("isRecruiting")) {
      params.set("isRecruiting", "true");
      needsUpdate = true;
    }
    if (needsUpdate) {
      params.set("tab", "scrap");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, []);

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "100px",
  });

  // 내가 스크랩한 폼 목록 조회
  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyScraps({
    limit: SCRAPS_PER_PAGE,
    orderBy: orderBy.scrap,
    isPublic: isPublic === "true" ? true : isPublic === "false" ? false : undefined,
    isRecruiting: isRecruiting === "true" ? true : isRecruiting === "false" ? false : undefined,
  });

  // 공개 여부 필터 변경 함수
  const handlePublicFilter = (selected: string) => {
    const option = filterPublicOptions.find((opt) => opt.label === selected);
    if (option) {
      const params = new URLSearchParams(searchParams);
      if (selected === "전체") {
        params.delete("isPublic");
      } else {
        params.set("isPublic", String(option.value));
      }
      params.set("tab", "scrap");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

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
      params.set("tab", "scrap");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // 현재 필터 상태에 따른 초기값 설정을 위한 함수들
  const getInitialPublicValue = (isPublic: string | null) => {
    if (!isPublic) return "전체";
    const option = filterPublicOptions.find((opt) => String(opt.value) === isPublic);
    return option?.label || "전체";
  };

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
      <div className="flex h-[calc(100vh-300px)] items-center justify-center">
        <p className="text-primary-orange-300">스크랩을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      {/* 필터 드롭다운 섹션 */}
      <div className="w-full border-b border-line-100">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-2 py-4">
          <div className="flex items-center gap-2">
            <FilterDropdown
              options={filterPublicOptions.map((option) => option.label)}
              initialValue={getInitialPublicValue(isPublic)}
              onChange={handlePublicFilter}
            />
            <FilterDropdown
              options={filterRecruitingOptions.map((option) => option.label)}
              initialValue={getInitialRecruitingValue(isRecruiting)}
              onChange={handleRecruitingFilter}
            />
          </div>
        </div>
      </div>

      {/* 스크랩 목록 렌더링 */}
      {!data?.pages?.[0]?.data?.length ? (
        <div className="flex h-[calc(100vh-300px)] flex-col items-center justify-center">
          <p className="text-grayscale-500">스크랩한 공고가 없습니다.</p>
        </div>
      ) : (
        <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
          {/* ScrollTopButton 추가 */}
          <ScrollTopButton showHeight={300} />

          <ContentSection>
            {data?.pages.map((page) => (
              <React.Fragment key={page.nextCursor}>
                {page.data.map((scrap: FormListType) => (
                  <Link href={`/work/${scrap.id}/`} key={scrap.id}>
                    <AlbaListItem {...scrap} />
                  </Link>
                ))}
              </React.Fragment>
            ))}
          </ContentSection>

          {/* 무한 스크롤 트리거 영역 */}
          <div ref={ref} className="h-4 w-full">
            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-orange-300 border-t-transparent" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
