import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyPostListResponse } from "@/types/response/user";

export const useMyPosts = (params?: { cursor?: string; limit?: number; orderBy?: string }) => {
  const query = useInfiniteQuery<MyPostListResponse>({
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

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
