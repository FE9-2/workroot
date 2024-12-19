import { ApplicationResponse } from "@/types/response/application";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface GuestVerifyData {
  name: string;
  phoneNumber: string;
  password: string;
}

export const useGuestApplication = (formId: string | number, verifyData?: GuestVerifyData) => {
  return useQuery<ApplicationResponse>({
    queryKey: ["guestApplication", formId, verifyData],
    queryFn: async () => {
      try {
        const response = await axios.post(`/api/forms/${formId}/applications/my-apply/verify`, verifyData);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorMessage = error.response?.data?.message || "지원내역을 불러오는데 실패했습니다.";
          toast.error(errorMessage);
        }
        throw error;
      }
    },
    enabled: !!formId && !!verifyData, // verifyData가 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });
};
