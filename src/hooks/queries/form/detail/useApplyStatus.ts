// 지원 현황 목록 조회

import { ApplicationListResponse } from "@/types/response/application";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseApplyStatusProps {
  formId: number;
  limit: number;
  cursor?: number;
  orderByExperience?: string;
  orderByStatus?: string;
}

export const useApplyStatus = (props: UseApplyStatusProps) => {
  console.log("useApplyStatus response.data 출력", props);
  const query = useQuery<ApplicationListResponse>({
    queryKey: ["applyStatus", props.formId, props.limit, props.cursor, props.orderByExperience, props.orderByStatus],
    queryFn: async () => {
      console.log("API 요청 중...");
      const response = await axios.get(`/api/forms/${props.formId}/applications`, {
        params: {
          limit: props.limit,
          cursor: props.cursor,
          orderByExperience: props.orderByExperience,
          orderByStatus: props.orderByStatus,
        },
      });
      console.log("API 응답:", response.data);
      return response.data;
    },
    enabled: !!props.formId,
  });

  return {
    ...query,
    applyStatusData: query.data,
    isPending: query.isPending,
    error: query.error,
  };
};
