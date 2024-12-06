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
    queryFn: async () => {
      const response = await axios.get<MyFormListResponse>("/api/users/me/scrap", {
        params: {
          cursor,
          limit,
          orderBy,
          isPublic,
          isRecruiting,
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
