import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyPostListResponse } from "@/types/response/user";
import toast from "react-hot-toast";

interface UseMyPostsParams {
  limit?: number;
  orderBy?: string;
}

export const useMyPosts = ({ limit = 10, orderBy }: UseMyPostsParams = {}) => {
  const query = useInfiniteQuery<MyPostListResponse>({
    queryKey: ["myPosts", { limit, orderBy }],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await axios.get<MyPostListResponse>("/api/users/me/posts", {
          params: {
            cursor: pageParam,
            limit,
            orderBy,
          },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "내 게시글 목록을 불러오는데 실패했습니다.";
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
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
