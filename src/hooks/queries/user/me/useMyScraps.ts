import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyFormListResponse } from "@/types/response/user";

interface UseMyScrapsParams {
  cursor?: string;
  limit?: number;
  orderBy?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}

export const useMyScraps = ({ cursor, limit, orderBy, isPublic, isRecruiting }: UseMyScrapsParams = {}) => {
  const query = useInfiniteQuery<MyFormListResponse>({
    queryKey: ["myScraps", { limit, orderBy, isPublic, isRecruiting }],
    queryFn: async ({ pageParam }) => {
      const response = await axios.get<MyFormListResponse>("/api/users/me/scrap", {
        params: {
          cursor: pageParam,
          limit,
          orderBy,
          isPublic: isPublic === undefined ? null : isPublic,
          isRecruiting: isRecruiting === undefined ? null : isRecruiting,
        },
        withCredentials: true,
      });
      return response.data;
    },
    initialPageParam: cursor,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    ...query,
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
};
