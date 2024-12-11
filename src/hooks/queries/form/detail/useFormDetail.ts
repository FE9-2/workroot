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
      return response.data; // 이 부분을 수정합니다.
    },
    enabled: !!formId, // formId가 유효한 경우에만 쿼리를 실행
  });

  return {
    ...query,
    albaFormDetailData: query.data, // response.data를 albaFormDetailData로 변경
    isPending: query.isPending,
    error: query.error,
  };
};
export default useFormDetail;
