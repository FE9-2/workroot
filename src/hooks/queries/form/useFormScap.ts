import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export const useFormScrap = (formId: number) => {
  const queryClient = useQueryClient();

  const scrapMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(`/api/forms/${formId}/scrap`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", formId] });
      toast.success("스크랩이 완료되었습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "스크랩에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("스크랩 중 오류가 발생했습니다.");
      }
    },
  });

  const unscrapMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/forms/${formId}/scrap`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms", formId] });
      toast.success("스크랩이 취소되었습니다.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "스크랩 취소에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("스크랩 취소 중 오류가 발생했습니다.");
      }
    },
  });

  return {
    scrap: scrapMutation.mutate,
    unscrap: unscrapMutation.mutate,
    isLoading: scrapMutation.isPending || unscrapMutation.isPending,
    error: scrapMutation.error || unscrapMutation.error,
  };
};
