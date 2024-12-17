"use client";

import React from "react";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { userRoles } from "@/constants/userRoles";
import SearchSection from "@/app/components/layout/forms/SearchSection";
import MyApplicationListItem from "@/app/components/card/cardList/MyApplicationListItem";
import { useMyApplications } from "@/hooks/queries/user/me/useMyApplications";
import ApplicantSortSection from "./components/ApplicantSortSection";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import ContentSection from "@/app/components/layout/ContentSection";
import Link from "next/link";

const APPLICATIONS_PER_PAGE = 10;

export default function ApplicantPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, isLoading: isUserLoading } = useUser();

  // 무한 스크롤을 위한 Intersection Observer 설정
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  // 검색 및 정렬 상태 관리
  const status = searchParams.get("status") || undefined;
  const keyword = searchParams.get("keyword") || undefined;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingData,
    error,
  } = useMyApplications({
    limit: APPLICATIONS_PER_PAGE,
    status,
    keyword,
  });

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push("/login");
      } else if (user.role === userRoles.OWNER) {
        router.push("/my-workform/owner");
      }
    }
  }, [user, isUserLoading, router]);

  // 스크롤이 하단에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">지원 내역을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isUserLoading || isLoadingData) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* 검색 섹션과 필터를 고정 위치로 설정 */}
      <div className="fixed left-0 right-0 top-16 z-30 bg-white shadow-sm">
        {/* 검색 섹션 */}
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
            <SearchSection pathname={pathname} placeholder="검색어로 조회해보세요" />
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
            <ApplicantSortSection pathname={pathname} searchParams={searchParams} />
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full pt-[132px]">
        {!data?.pages?.[0]?.data?.length ? (
          <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
            <p className="text-grayscale-500">지원 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
            <ContentSection>
              {data?.pages.map((page) => (
                <React.Fragment key={page.nextCursor}>
                  {page.data.map((application) => (
                    <div key={application.id}>
                      <Link href={`/work/${application.form.id}`}>
                        <MyApplicationListItem
                          id={application.id}
                          createdAt={application.createdAt}
                          updatedAt={application.updatedAt}
                          status={application.status}
                          resumeId={application.resumeId}
                          resumeName={application.resumeName}
                          form={application.form}
                        />
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
