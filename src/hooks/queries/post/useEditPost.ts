import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { PostSchema } from "@/schemas/postSchema";

export const useEditPost = (postId: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: PostSchema) => {
      const response = await axios.patch(`/api/posts/${postId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("게시글이 수정되었습니다!", {
        style: {
          textAlign: "center",
        },
      });
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["myPosts"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "게시글 수정에 실패했습니다.";
        toast.error(errorMessage, {
          style: {
            textAlign: "center",
          },
        });
      } else {
        toast.error("게시글 수정 중 오류가 발생했습니다.", {
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
