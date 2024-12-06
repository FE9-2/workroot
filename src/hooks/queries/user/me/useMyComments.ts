import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MyCommentListResponse } from "@/types/response/user";

export const useMyComments = (params?: { page?: number; pageSize?: number }) => {
  const query = useQuery<MyCommentListResponse>({
    queryKey: ["myComments", params],
    queryFn: async () => {
      const response = await axios.get<MyCommentListResponse>("/api/users/me/comments", {
        params,
        withCredentials: true,
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  return {
    ...query,
    isPending: query.isPending,
    error: query.error,
  };
};
