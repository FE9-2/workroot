import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { FormListResponse } from "@/types/response/form";
import toast from "react-hot-toast";

interface UseFormsParams {
  cursor?: string;
  limit?: number;
  orderBy?: string;
  keyword?: string;
  isRecruiting?: boolean;
}

export const useForms = ({ cursor, limit = 10, orderBy, keyword, isRecruiting }: UseFormsParams = {}) => {
  const query = useInfiniteQuery<FormListResponse>({
    queryKey: ["forms", { limit, orderBy, keyword, isRecruiting }],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/forms", {
          params: {
            cursor,
            limit,
            orderBy,
            keyword,
            isRecruiting,
          },
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "알바폼 목록을 불러오는데 실패했습니다.";
          toast.error(errorMessage);
        }
        throw error;
      }
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
