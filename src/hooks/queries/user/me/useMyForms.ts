import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyFormListResponse } from "@/types/response/user";
import toast from "react-hot-toast";

interface UseMyFormsParams {
  limit?: number;
  orderBy?: string;
  keyword?: string;
  isPublic?: boolean;
  isRecruiting?: boolean;
}

export const useMyForms = ({ limit = 10, orderBy, keyword, isPublic, isRecruiting }: UseMyFormsParams = {}) => {
  const query = useInfiniteQuery<MyFormListResponse>({
    queryKey: ["myForms", { limit, orderBy, keyword, isPublic, isRecruiting }],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await axios.get<MyFormListResponse>("/api/users/me/forms", {
          params: {
            cursor: pageParam,
            limit,
            orderBy,
            keyword,
            isPublic,
            isRecruiting,
          },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "내 알바폼 목록을 불러오는데 실패했습니다.";
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
