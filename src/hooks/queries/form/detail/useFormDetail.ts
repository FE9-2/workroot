import { FormDetailResponse } from "@/types/response/form";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseFormDetailParams {
  formId?: number;
}

export const useFormDetail = ({ formId }: UseFormDetailParams) => {
  const query = useQuery<FormDetailResponse>({
    queryKey: ["formDetail", formId],
    queryFn: async () => {
      if (!formId) {
        throw new Error("formId가 없습니다.");
      }
      const response = await axios.get(`/api/forms/${formId}`);
      return response.data;
    },
    enabled: !!formId, // formId가 유효한 경우에만 쿼리 실행
  });

  return {
    ...query,
    albaFormDetailData: query.data,
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
};

export default useFormDetail;
