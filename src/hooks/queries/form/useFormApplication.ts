import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ApplicationSchema } from "@/schemas/applicationSchema";

export const useFormApplication = (formId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: ApplicationSchema) => {
      const response = await axios.post(`/api/forms/${formId}/applications`, data);
      return response.data;
    },
    onSuccess: () => {
      // 지원 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["forms", formId] });
      toast.success("지원이 완료되었습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "지원에 실패했습니다.";
        console.error("Apply form error:", {
          status: error.response?.status,
          data: error.response?.data,
        });
        toast.error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        toast.error("지원 중 오류가 발생했습니다.");
      }
    },
  });

  return {
    formApplication: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
