import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  UserResponse,
  MyFormListResponse,
  MyApplicationListResponse,
  MyPostListResponse,
  MyCommentListResponse,
} from "@/types/response/user";
import toast from "react-hot-toast";

export const useUser = () => {
  // 사용자 정보 조회
  const userQuery = useQuery<{ user: UserResponse | null }>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/users/me", {
          withCredentials: true,
        });

        // 응답 데이터 구조 수정
        const userData = {
          user: response.data, // response.data가 이미 UserResponse 형태라고 가정
        };

        return userData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return { user: null };
          } else {
            toast.error("사용자 정보를 불러오는 데 실패했습니다." + error.response?.data.message);
          }
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
  });

  // 내가 생성한 알바폼 목록 조회 (무한 스크롤)
  const useMyForms = (params?: {
    cursor?: string; // 다음 페이지 커서
    limit?: number; // 한 페이지당 아이템 수
    orderBy?: string; // 정렬 기준
    keyword?: string; // 검색어
    isPublic?: boolean; // 공개 여부
    isRecruiting?: boolean; // 모집 중 여부
  }) => {
    return useInfiniteQuery<MyFormListResponse>({
      queryKey: ["myForms", params],
      queryFn: async ({ pageParam = undefined }) => {
        const response = await axios.get<MyFormListResponse>("/api/users/me/forms", {
          params: {
            ...params,
            cursor: pageParam,
          },
          withCredentials: true,
        });
        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor, // 다음 페이지 커서 반환
      initialPageParam: undefined, // 초기 페이지 파라미터
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 지원한 알바폼 목록 조회 (무한 스크롤)
  const useMyApplications = (params?: {
    cursor?: string; // 다음 페이지 커서
    limit?: number; // 한 페이지당 아이템 수
    status?: string; // 지원 상태 필터
    keyword?: string; // 검색어
  }) => {
    return useInfiniteQuery<MyApplicationListResponse>({
      queryKey: ["myApplications", params],
      queryFn: async ({ pageParam = undefined }) => {
        const response = await axios.get<MyApplicationListResponse>("/api/users/me/applications", {
          params: {
            ...params,
            cursor: pageParam,
          },
          withCredentials: true,
        });
        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: undefined,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 작성한 게시글 목록 조회 (무한 스크롤)
  const useMyPosts = (params?: {
    cursor?: string; // 다음 페이지 커서
    limit?: number; // 한 페이지당 아이템 수
    orderBy?: string; // 정렬 기준
  }) => {
    return useInfiniteQuery<MyPostListResponse>({
      queryKey: ["myPosts", params],
      queryFn: async ({ pageParam = undefined }) => {
        const response = await axios.get<MyPostListResponse>("/api/users/me/posts", {
          params: {
            ...params,
            cursor: pageParam,
          },
          withCredentials: true,
        });
        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: undefined,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 작성한 댓글 목록 조회 (페이지네이션)
  const useMyComments = (params?: {
    page?: number; // 페이지 번호
    pageSize?: number; // 한 페이지당 아이템 수
  }) => {
    return useQuery<MyCommentListResponse>({
      queryKey: ["myComments", params],
      queryFn: async () => {
        const response = await axios.get<MyCommentListResponse>("/api/users/me/comments", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 스크랩한 알바폼 목록 조회 (무한 스크롤)
  const useMyScraps = (params?: {
    cursor?: string; // 다음 페이지 커서
    limit?: number; // 한 페이지당 아이템 수
    orderBy?: string; // 정렬 기준
    isPublic?: boolean; // 공개 여부
    isRecruiting?: boolean; // 모집 중 여부
  }) => {
    return useInfiniteQuery<MyFormListResponse>({
      queryKey: ["myScraps", params],
      queryFn: async ({ pageParam = undefined }) => {
        const response = await axios.get<MyFormListResponse>("/api/users/me/scrap", {
          params: {
            ...params,
            cursor: pageParam,
          },
          withCredentials: true,
        });
        return response.data;
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: undefined,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 훅의 반환값들
  return {
    user: userQuery.data?.user || null,
    refetch: userQuery.refetch,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    useMyForms,
    useMyApplications,
    useMyPosts,
    useMyComments,
    useMyScraps,
  };
};
