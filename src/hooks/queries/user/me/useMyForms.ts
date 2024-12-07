import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyFormListResponse } from "@/types/response/user";

interface UseMyFormsParams {
  cursor?: string;
  limit?: number;
  orderBy?: string;
  keyword?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}

export const useMyForms = ({ cursor, limit, orderBy, keyword, isPublic, isRecruiting }: UseMyFormsParams = {}) => {
  const query = useInfiniteQuery<MyFormListResponse>({
    queryKey: ["myForms", { limit, orderBy, keyword, isPublic, isRecruiting }],
    queryFn: async () => {
      const response = await axios.get<MyFormListResponse>("/api/users/me/forms", {
        params: {
          cursor,
          limit,
          orderBy,
          keyword,
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
