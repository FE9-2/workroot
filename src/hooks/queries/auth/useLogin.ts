import { LoginSchema } from "@/schemas/authSchema";
import { AuthResponse } from "@/types/response/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/login", data, {
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "로그인 중 오류가 발생했습니다.");
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(["user"], { user: data.user });
        toast.success("로그인되었습니다!");
        router.push("/");
        router.refresh();
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    login: (data: LoginSchema) => loginMutation.mutate(data),
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
};
