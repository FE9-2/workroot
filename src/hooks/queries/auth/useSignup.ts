import { SignupSchema } from "@/schemas/authSchema";
import { AuthResponse } from "@/types/response/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  const router = useRouter();

  const signupMutation = useMutation<AuthResponse, Error, SignupSchema>({
    mutationFn: async (data: SignupSchema) => {
      try {
        const response = await axios.post<AuthResponse>("/api/auth/signup", data, {
          withCredentials: false,
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
        }
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("회원가입이 완료되었습니다!");
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    signup: (data: SignupSchema) => signupMutation.mutate(data),
    isPending: signupMutation.isPending,
    error: signupMutation.error,
  };
};
