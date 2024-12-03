import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  UserResponse,
  MyFormListResponse,
  MyApplicationListResponse,
  MyPostListResponse,
  MyCommentListResponse,
} from "@/types/response/user";

export const useUser = () => {
  // 사용자 정보 조회
  const userQuery = useQuery<{ user: UserResponse | null }>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/users/me", {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return { user: null };
          }
          throw new Error(error.response?.data?.message || "사용자 정보를 가져오는데 실패했습니다.");
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  // 내가 생성한 알바폼 목록 조회
  const useMyForms = (params?: {
    cursor?: string;
    limit?: number;
    orderBy?: string;
    keyword?: string;
    isPublic?: boolean;
    isRecruiting?: boolean;
  }) => {
    return useQuery<MyFormListResponse>({
      queryKey: ["myForms", params],
      queryFn: async () => {
        const response = await axios.get<MyFormListResponse>("/api/users/me/forms", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 지원한 알바폼 목록 조회
  const useMyApplications = (params?: { cursor?: string; limit?: number; status?: string; keyword?: string }) => {
    return useQuery<MyApplicationListResponse>({
      queryKey: ["myApplications", params],
      queryFn: async () => {
        const response = await axios.get<MyApplicationListResponse>("/api/users/me/applications", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 작성한 게시글 목록 조회 (무한 스크롤)
  const useMyPosts = (params?: { limit?: number; orderBy?: string }) => {
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

  // 내가 작성한 댓글 목록 조회
  const useMyComments = (params?: { page?: number; pageSize?: number }) => {
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
  const useMyScraps = (params?: { limit?: number; orderBy?: string; isPublic?: boolean; isRecruiting?: boolean }) => {
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

  return {
    user: userQuery.data?.user,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    refetch: userQuery.refetch,
    useMyForms,
    useMyApplications,
    useMyPosts,
    useMyComments,
    useMyScraps,
  };
};
