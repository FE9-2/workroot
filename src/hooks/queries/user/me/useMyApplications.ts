import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyApplicationListResponse } from "@/types/response/user";

interface UseMyApplicationsParams {
  cursor?: string;
  limit?: number;
  status?: string;
  keyword?: string;
}

export const useMyApplications = ({ cursor, limit, status, keyword }: UseMyApplicationsParams = {}) => {
  const query = useInfiniteQuery<MyApplicationListResponse>({
    queryKey: ["myApplications", { limit, status, keyword }],
    queryFn: async () => {
      const response = await axios.get<MyApplicationListResponse>("/api/users/me/applications", {
        params: {
          cursor,
          limit,
          status,
          keyword,
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
