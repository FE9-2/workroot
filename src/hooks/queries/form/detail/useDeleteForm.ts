import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useDeleteForm = (formId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/forms/${formId}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("워크폼이 삭제되었습니다!", {
        style: {
          textAlign: "center",
        },
      });
      // 폼 목록과 상세 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["forms"] });
      queryClient.invalidateQueries({ queryKey: ["myForms"] });
      queryClient.invalidateQueries({ queryKey: ["formDetail", formId] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "워크폼 삭제에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("워크폼 삭제 중 오류가 발생했습니다.", {
          style: {
            textAlign: "center",
          },
        });
      }
      console.error("워크폼 삭제 실패:", error);
    },
  });

  return {
    ...mutation,
    deleteForm: mutation.mutate,
    isDeleting: mutation.isPending,
    error: mutation.error,
  };
};
