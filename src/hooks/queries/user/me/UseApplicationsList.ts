import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyApplicationListResponse } from "@/types/response/user";
import toast from "react-hot-toast";

interface UseApplicationsListParams {
  limit?: number;
  status?: string;
  keyword?: string;
}

// 지원 목록 조회
export const useApplicationsList = ({ limit = 10, status, keyword }: UseApplicationsListParams) => {
  const query = useInfiniteQuery<MyApplicationListResponse>({
    queryKey: ["myApplications", { limit, status, keyword }],
    queryFn: async ({ pageParam }) => {
      try {
        const response = await axios.get<MyApplicationListResponse>("/api/users/me/applications", {
          params: {
            cursor: pageParam,
            limit,
            status,
            keyword,
          },
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "내 지원서 목록을 불러오는데 실패했습니다.";
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
