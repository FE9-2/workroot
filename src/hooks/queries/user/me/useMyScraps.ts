import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyFormListResponse } from "@/types/response/user";

export const useMyScraps = (params?: {
  cursor?: string;
  limit?: number;
  orderBy?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}) => {
  const query = useInfiniteQuery<MyFormListResponse>({
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

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
