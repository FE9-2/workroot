import { MyApplicationResponse } from "@/types/response/myApplicant";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// 회원의 내 지원 내역 조회
export const useMyApplication = (formId: string | number) => {
  return useQuery<MyApplicationResponse>({
    queryKey: ["myApplication", formId],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/forms/${formId}/applications/my-apply`);
        return Object.keys(response.data).length === 0 ? null : response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "지원내역을 불러오는데 실패했습니다.";
          toast.error(errorMessage);
        }
        throw error;
      }
    },
    enabled: !!formId,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};
