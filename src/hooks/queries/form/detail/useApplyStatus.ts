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
  const query = useQuery<ApplicationListResponse>({
    queryKey: ["applyStatus", props.formId, props.limit, props.cursor, props.orderByExperience, props.orderByStatus],
    queryFn: async () => {
      const response = await axios.get(`/api/forms/${props.formId}/applications`, {
        params: {
          limit: props.limit,
          cursor: props.cursor,
          orderByExperience: props.orderByExperience,
          orderByStatus: props.orderByStatus,
        },
      });
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
