import { PostListResponse } from "@/types/response/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface UsePostsParams {
  limit?: number;
  orderBy?: string;
  keyword?: string;
}

export const usePosts = ({ limit = 10, orderBy, keyword }: UsePostsParams = {}) => {
  const query = useInfiniteQuery<PostListResponse>({
    queryKey: ["posts", { limit, orderBy, keyword }],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await axios.get("/api/posts", {
          params: {
            cursor: pageParam,
            limit,
            orderBy,
            keyword,
          },
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "알바 토크를 불러오는데 실패했습니다.";
          toast.error(errorMessage);
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor || lastPage.data.length === 0) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
