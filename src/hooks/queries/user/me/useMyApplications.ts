import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyApplicationListResponse } from "@/types/response/user";

export const useMyApplications = (params?: { cursor?: string; limit?: number; status?: string; keyword?: string }) => {
  const query = useInfiniteQuery<MyApplicationListResponse>({
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

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
