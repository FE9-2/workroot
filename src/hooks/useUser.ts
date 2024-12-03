import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostListResponse } from "@/types/response/post";

export const useUser = () => {
  // 사용자 정보 조회
  const userQuery = useQuery({
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

  // 내가 작성한 게시글 목록 조회
  const useMyPosts = (params?: { cursor?: string; limit?: number; orderBy?: string }) => {
    return useQuery<PostListResponse>({
      queryKey: ["myPosts", params],
      queryFn: async () => {
        const response = await axios.get<PostListResponse>("/api/users/me/posts", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 스크랩한 알바폼 목록 조회
  const useMyScraps = (params?: {
    cursor?: string;
    limit?: number;
    orderBy?: string;
    isPublic?: boolean;
    isRecruiting?: boolean;
  }) => {
    return useQuery({
      queryKey: ["myScraps", params],
      queryFn: async () => {
        const response = await axios.get("/api/users/me/scrap", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 생성한 알바폼 목록 조회
  const useMyForms = (params?: {
    cursor?: string;
    limit?: number;
    orderBy?: string;
    keyword?: string;
    isPublic?: boolean;
    isRecruiting?: boolean;
  }) => {
    return useQuery({
      queryKey: ["myForms", params],
      queryFn: async () => {
        const response = await axios.get("/api/users/me/forms", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  // 내가 작성한 댓글 목록 조회
  const useMyComments = (params?: { cursor?: string; limit?: number; keyword?: string; orderBy?: string }) => {
    return useQuery({
      queryKey: ["myComments", params],
      queryFn: async () => {
        const response = await axios.get("/api/users/me/comments", {
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
    return useQuery({
      queryKey: ["myApplications", params],
      queryFn: async () => {
        const response = await axios.get("/api/users/me/applications", {
          params,
          withCredentials: true,
        });
        return response.data;
      },
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    });
  };

  return {
    user: userQuery.data?.user,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    refetch: userQuery.refetch,
    useMyPosts,
    useMyScraps,
    useMyForms,
    useMyComments,
    useMyApplications,
  };
};
