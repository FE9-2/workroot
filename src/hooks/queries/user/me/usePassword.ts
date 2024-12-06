import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

export const usePassword = () => {
  const mutation = useMutation({
    mutationFn: async (data: PasswordData) => {
      const response = await axios.patch("/api/users/me/password", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("비밀번호가 변경되었습니다!\n다시 로그인해주세요.", {
        style: {
          whiteSpace: "pre-line",
          textAlign: "center",
        },
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "비밀번호 변경에 실패했습니다.";
        toast.error(errorMessage);
      } else {
        toast.error("비밀번호 변경 중 오류가 발생했습니다.");
      }
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
