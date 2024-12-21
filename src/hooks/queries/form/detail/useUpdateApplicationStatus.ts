import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "axios";

interface UpdateApplicationStatusParams {
  applicationId: string;
  status: string;
}

export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ applicationId, status }: UpdateApplicationStatusParams) => {
      const response = await axios.patch(`/api/applications/${applicationId}`, {
        status,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applyStatus"] });
    },
    onError: (error: Error | AxiosError) => {
      console.error("지원서 상태 업데이트 실패:", error);
    },
  });
};
