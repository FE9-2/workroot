import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchUser() {
  try {
    const response = await axios.get("/api/users/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { user: null };
      }
      throw new Error(error.response?.data?.message || "사용자 정보를 가져오는데 실패했습니다.");
    }
    throw error;
  }
}

export function useUser() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  return {
    user: data?.user,
    isLoading,
    error,
    refetch,
  };
}
