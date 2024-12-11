"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useForms } from "@/hooks/queries/form/useForms";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { filterRecruitingOptions } from "@/constants/filterOptions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SortSection from "@/app/components/layout/forms/SortSection";
import AlbaListItem from "@/app/components/card/cardList/AlbaListItem";
import SearchSection from "@/app/components/layout/forms/SearchSection";
import { useUser } from "@/hooks/queries/user/me/useUser";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { userRoles } from "@/constants/userRoles";

const FORMS_PER_PAGE = 10;

export default function AlbaList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const isOwner = user?.role === userRoles.OWNER;

  // URL 쿼리 파라미터에서 필터 상태와 키워드 가져오기
  const isRecruiting = searchParams.get("isRecruiting");
  const keyword = searchParams.get("keyword");
  const orderBy = searchParams.get("orderBy");

  // 초기 마운트 시 필 값 설정
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
    keyword: keyword || undefined,
    orderBy: orderBy || undefined,
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
    <div className="flex min-h-screen flex-col items-center">
      {/* 검색 섹션과 필터 드롭다운을 고정 위치로 설정 */}
      <div className="fixed left-0 right-0 top-16 z-40 bg-white shadow-sm">
        {/* 검색 섹션 */}
        <div className="w-full border-b border-grayscale-100">
          <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <SearchSection />
            </div>
          </div>
        </div>

        {/* 필터 드롭다운 섹션 */}
        <div className="w-full border-b border-grayscale-100">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
            <FilterDropdown
              options={filterRecruitingOptions.map((option) => option.label)}
              initialValue={getInitialRecruitingValue(isRecruiting)}
              onChange={handleRecruitingFilter}
            />
            <div className="flex items-center gap-4">
              <SortSection pathname={pathname} searchParams={searchParams} />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full pt-[132px]">
        {/* 폼 만들기 버튼 - 고정 위치 */}
        {isOwner && (
          <div className="fixed bottom-[50%] right-4 z-[9999] translate-y-1/2">
            <Link
              href="/addform"
              className="flex items-center gap-2 rounded-lg bg-[#FFB800] px-4 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-[#FFA800] md:px-6 md:text-lg"
            >
              <IoAdd className="size-6" />
              <span>폼 만들기</span>
            </Link>
          </div>
        )}

        {!data?.pages?.[0]?.data?.length ? (
          <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
            <p className="text-grayscale-500">등록된 알바 공고가 없습니다.</p>
          </div>
        ) : (
          <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
            <div className="flex flex-wrap justify-start gap-6">
              {data?.pages.map((page) => (
                <React.Fragment key={page.nextCursor}>
                  {page.data.map((form) => (
                    <div key={form.id}>
                      {/* <Link
                        href={isOwner ? `/albaFormDetail/owner/${form.id}` : `/albaFormDetail/applicant/${form.id}`}
                      > */}
                      <Link href={`/alba/${form.id}`}>
                        <AlbaListItem {...form} />
                      </Link>
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
          </div>
        )}
      </div>
    </div>
  );
}
