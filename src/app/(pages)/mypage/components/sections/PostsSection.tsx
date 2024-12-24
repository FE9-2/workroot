"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMyPosts } from "@/hooks/queries/user/me/useMyPosts";
import { useMySortStore } from "@/store/mySortStore";
import { useProfileStringValue } from "@/hooks/queries/user/me/useProfileStringValue";
import ContentSection from "@/app/components/layout/ContentSection";
import useWidth from "@/hooks/useWidth";
import ScrollTopButton from "@/app/components/button/default/ScrollTopButton";
import BoardPostItem from "@/app/components/card/board/BoardPostItem";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import SamllLoadingSpinner from "@/app/components/loading-spinner/SmallLoadingSpinner";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

export default function PostsSection() {
  const { orderBy } = useMySortStore();
  const { isMobile, isTablet } = useWidth();
  useProfileStringValue();

  // 화면 크기에 따른 페이지당 게시글 수 계산
  const getPostsPerPage = () => {
    if (isMobile) return 2; // 1열 x 2줄 = 2개
    if (isTablet) return 2; // 1열 x 2줄 = 4개
    return 6; // 3열 x 2줄 = 6개
  };

  const postsPerPage = getPostsPerPage();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px",
  });

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } = useMyPosts({
    limit: postsPerPage,
    orderBy: orderBy.posts,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (error) {
    return (
      <div className="flex h-[calc(100vh-300px)] items-center justify-center">
        <p className="text-primary-orange-300">게시글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center">
      {/* 메인 콘텐츠 영역 */}
      <div className="w-full">
        {!data?.pages?.[0]?.data?.length ? (
          <div className="flex h-[calc(100vh-300px)] flex-col items-center justify-center">
            <p className="text-grayscale-500">작성한 게시글이 없습니다.</p>
          </div>
        ) : (
          <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
            {isLoading && SamllLoadingSpinner}
            {/* ScrollTopButton 추가 */}
            <ScrollTopButton showHeight={300} />

            <ContentSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3">
                {data.pages.map((page) => (
                  <React.Fragment key={page.nextCursor}>
                    {page.data.map((post) => (
                      <BoardPostItem post={post} key={post.id} />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </ContentSection>

            {/* 무한 스크롤 트리거 영역 */}
            <div ref={ref} className="h-4 w-full">
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <DotLoadingSpinner />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
