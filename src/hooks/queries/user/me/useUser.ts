import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserResponse } from "@/types/response/user";
import toast from "react-hot-toast";

export const useUser = () => {
  const userQuery = useQuery<{ user: UserResponse | null }>({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/users/me", {
          withCredentials: true,
        });

        const userData = {
          user: response.data,
        };

        return userData;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return { user: null };
          } else {
            toast.error("사용자 정보를 불러오는 데 실패했습니다." + error.response?.data.message);
          }
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
  });

  return {
    user: userQuery.data?.user || null,
    refetch: userQuery.refetch,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    isPending: userQuery.isPending,
  };
};
