import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRefreshToken = () => {
  const refreshMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post("/api/auth/refresh");
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          return null;
        }
        throw error;
      }
    },
    onError: (error: Error) => {
      console.error("Token refresh failed:", error);
    },
  });

  return {
    refresh: () => refreshMutation.mutate(),
    isPending: refreshMutation.isPending,
    error: refreshMutation.error,
  };
};
