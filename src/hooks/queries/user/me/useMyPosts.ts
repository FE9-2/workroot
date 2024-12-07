import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyPostListResponse } from "@/types/response/user";

interface UseMyPostsParams {
  cursor?: string;
  limit?: number;
  orderBy?: string;
}

export const useMyPosts = ({ cursor, limit, orderBy }: UseMyPostsParams = {}) => {
  const query = useInfiniteQuery<MyPostListResponse>({
    queryKey: ["myPosts", { limit, orderBy }],
    queryFn: async () => {
      const response = await axios.get<MyPostListResponse>("/api/users/me/posts", {
        params: {
          cursor,
          limit,
          orderBy,
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

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
