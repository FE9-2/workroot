// 지원 현황 목록 조회

import { ApplicationListResponse } from "@/types/response/application";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UseApplicationStatusProps {
  formId: number;
  limit: number;
  cursor?: number;
  orderByExperience?: string;
  orderByStatus?: string;
}

export const useApplicationStatus = (props: UseApplicationStatusProps) => {
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

      // 응답 데이터의 각 항목에 고유한 키 추가
      if (response.data.data) {
        response.data.data = response.data.data.map((item: { id: string }, index: string) => ({
          ...item,
          uniqueKey: `${item.id}_${index}`,
        }));
      }

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
