import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { PostDetailResponse } from "@/types/response/post";
import { PostSchema } from "@/schemas/postSchema";

export const useAddPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: PostSchema) => {
      const response = await axios.post<PostDetailResponse>("/api/posts", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("게시글이 등록되었습니다!", {
        style: {
          textAlign: "center",
        },
      });
      // 게시글 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "게시글 등록에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("게시글 등록 중 오류가 발생했습니다.", {
          style: {
            textAlign: "center",
          },
        });
      }
    },
  });

  return {
    ...mutation,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
