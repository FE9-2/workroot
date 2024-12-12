import { PostListResponse } from "@/types/response/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface UsePostsParams {
  cursor?: string;
  limit?: number;
  orderBy?: string;
  keyword?: string;
}

export const usePosts = ({ cursor, limit = 10, orderBy, keyword }: UsePostsParams = {}) => {
  const query = useInfiniteQuery<PostListResponse>({
    queryKey: ["posts", { limit, orderBy, keyword }],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/posts", {
          params: {
            cursor,
            limit,
            orderBy,
            keyword,
          },
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "게시글 목록을 불러오는데 실패했습니다.";
          toast.error(errorMessage);
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
