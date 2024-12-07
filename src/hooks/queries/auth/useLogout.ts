import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
      router.refresh();
    },
    onError: (error: Error) => {
      toast.error(error.message || "로그아웃 중 오류가 발생했습니다.");
    },
  });

  return {
    logout: () => logoutMutation.mutate(),
    isPending: logoutMutation.isPending,
    error: logoutMutation.error,
  };
};
