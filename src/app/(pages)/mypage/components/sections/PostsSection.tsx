"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useMyPosts } from "@/hooks/queries/user/me/useMyPosts";
import { useMySortStore } from "@/store/mySortStore";
import { useProfileStringValue } from "@/hooks/queries/user/me/useProfileStringValue";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import ContentSection from "@/app/components/layout/ContentSection";
import SortSection from "@/app/components/layout/posts/SortSection";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { formatLocalDate } from "@/utils/workDayFormatter";
import useWidth from "@/hooks/useWidth";

export default function PostsSection() {
  const { orderBy } = useMySortStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMobile, isTablet, isDesktop } = useWidth();
  useProfileStringValue();

  // 화면 크기에 따른 페이지당 게시글 수 계산
  const getPostsPerPage = () => {
    if (isMobile) return 2; // 1열 x 2줄 = 2개
    if (isTablet) return 4; // 2열 x 2줄 = 4개
    if (isDesktop) return 6; // 3열 x 2줄 = 6개
    return 8; // xl 사이즈: 4열 x 2줄 = 8개
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
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-red-500">게시글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* 정렬 옵션 섹션 */}
      <div className="fixed left-0 right-0 top-16 z-30 bg-white shadow-sm">
        <div className="w-full border-b border-line-100">
          <div className="mx-auto flex max-w-screen-xl items-center justify-end gap-2 px-4 py-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <SortSection pathname={pathname} searchParams={searchParams} />
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="w-full">
        {!data?.pages?.[0]?.data?.length ? (
          <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center">
            <p className="text-grayscale-500">작성한 게시글이 없습니다.</p>
          </div>
        ) : (
          <div className="mx-auto mt-4 w-full max-w-screen-xl px-3">
            <ContentSection>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.pages.map((page) => (
                  <React.Fragment key={page.nextCursor}>
                    {page.data.map((post) => (
                      <div key={post.id} className="flex justify-center">
                        <Link
                          href={`/albatalk/${post.id}`}
                          className="block cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                        >
                          <div className="rounded-lg border border-grayscale-100 bg-white p-6">
                            <div className="flex flex-col gap-4">
                              {/* 제목 */}
                              <h3 className="text-lg font-semibold text-black-400 md:text-xl">{post.title}</h3>

                              {/* 내용 */}
                              <p className="line-clamp-2 text-sm text-grayscale-400 md:text-base">{post.content}</p>

                              {/* 하단 정보 */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-black-400 md:text-base">
                                    {post.writer.nickname}
                                  </span>
                                  <span className="text-grayscale-400">|</span>
                                  <span className="text-sm text-grayscale-400 md:text-base">
                                    {formatLocalDate(post.updatedAt)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <Image src="/icons/comment/comment-sm.svg" alt="댓글" width={20} height={20} />
                                    <span className="text-sm text-grayscale-400">{post.commentCount}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Image src="/icons/like/like-sm.svg" alt="좋아요" width={20} height={20} />
                                    <span className="text-sm text-grayscale-400">{post.likeCount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </ContentSection>

            {/* 무한 스크롤 트리거 영역 */}
            <div ref={ref} className="h-4 w-full">
              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
