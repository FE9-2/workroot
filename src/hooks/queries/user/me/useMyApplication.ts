import { ApplicationResponse } from "@/types/response/application";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/queries/user/me/useUser";

// 회원의 내 지원 내역 조회
export const useMyApplication = (formId: string | number) => {
  const { user } = useUser();

  return useQuery<ApplicationResponse>({
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
    enabled: !!formId && !!user, // user가 있을 때만 실행되도록 수정
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
