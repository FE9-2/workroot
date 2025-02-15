"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMyForms } from "@/hooks/queries/user/me/useMyForms";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";
import { filterRecruitingOptions, filterPublicOptions } from "@/constants/filterOptions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import SortSection from "@/app/components/layout/forms/SortSection";
import AlbaListItem from "@/app/components/card/cardList/AlbaListItem";
import SearchSection from "@/app/components/layout/forms/SearchSection";
import { useUser } from "@/hooks/queries/user/me/useUser";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import { userRoles } from "@/constants/userRoles";
import FloatingBtn from "@/app/components/button/default/FloatingBtn";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import ContentSection from "@/app/components/layout/ContentSection";
import ScrollTopButton from "@/app/components/button/default/ScrollTopButton";
import SearchSpinner from "@/app/components/loading-spinner/SearchSpinner";

const FORMS_PER_PAGE = 10;

export default function AlbaList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isLoading } = useUser();
  const isOwner = user?.role === userRoles.OWNER;

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== userRoles.OWNER) {
        router.push("/my-workform/applicant");
      }
    }
  }, [user, isLoading, router]);

  // URL 쿼리 파라미터에서 필터 상태와 키워드 가져오기
  const isPublic = searchParams.get("isPublic");
  const isRecruiting = searchParams.get("isRecruiting");
  const keyword = searchParams.get("keyword");
  const orderBy = searchParams.get("orderBy");

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
      router.push(`${pathname}?${params.toString()}`);
    }
  }, []);

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  // 워크폼 목록 조회
  const {
    data,
    isLoading: isLoadingData,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMyForms({
    limit: FORMS_PER_PAGE,
    isPublic: isPublic === "true" ? true : isPublic === "false" ? false : undefined,
    isRecruiting: isRecruiting === "true" ? true : isRecruiting === "false" ? false : undefined,
    keyword: keyword || undefined,
    orderBy: orderBy || undefined,
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
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  // 현재 필터 상태에 따른 초기값 설정
  const getInitialPublicValue = (isPublic: string | null) => {
    if (!isPublic) return "전체";
    const option = filterPublicOptions.find((opt) => String(opt.value) === isPublic);
    return option?.label || "전체";
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
      <div className="flex h-[calc(100vh-300px)] items-center justify-center">
        <p className="text-primary-orange-300">워크 채널을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoadingData && !keyword) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center">
      {/* 검색 섹션과 필터 드롭다운을 고정 위치로 설정 */}
      <div className="fixed left-0 right-0 top-16 z-30 bg-white shadow-sm">
        {/* 검색 섹션 */}
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <SearchSection pathname={pathname} placeholder="검색어로 조회해보세요" />
            </div>
          </div>
        </div>

        {/* 필터 드롭다운 섹션 */}
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
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
            <div className="flex items-center gap-4">
              <SortSection pathname={pathname} searchParams={searchParams} />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="relative w-full pt-[132px]">
        {keyword && isLoadingData && <SearchSpinner />}

        {/* 폼 만들기 버튼 - 고정 위치 */}
        {isOwner && (
          <Link href="/addform" className="fixed bottom-[50%] right-4 z-[9999] translate-y-1/2">
            <FloatingBtn icon={<IoAdd className="size-6" />} variant="orange">
              폼 만들기
            </FloatingBtn>
          </Link>
        )}

        {/* ScrollTopButton 추가 */}
        <ScrollTopButton showHeight={300} />

        {!data?.pages?.[0]?.data?.length ? (
          <div className="flex h-[calc(100vh-300px)] flex-col items-center justify-center">
            <p className="text-grayscale-500">등록된 알바 공고가 없습니다.</p>
          </div>
        ) : (
          <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
            <ContentSection>
              {data?.pages.map((page) => (
                <React.Fragment key={page.nextCursor}>
                  {page.data.map((form) => (
                    <div key={form.id}>
                      <Link href={`/work/${form.id}`}>
                        <AlbaListItem {...form} isMyForm={true} />
                      </Link>
                    </div>
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
    </div>
  );
}
