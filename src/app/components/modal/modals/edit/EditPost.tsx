"use client";

import React, { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@/app/components/button/default/Button";
import BaseInput from "@/app/components/input/text/BaseInput";
import ImageInputWithPlaceHolder from "@/app/components/input/file/ImageInput/ImageInputPlaceHolder";
import axios from "axios";
import { Post } from "@/types/post";
import { useMutation } from "@tanstack/react-query";

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  onUpdate: (updatedPost: Post) => void;
}

export default function EditPostModal({ post, onClose, onUpdate }: EditPostModalProps) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: post.title,
      content: post.content,
      imageUrl: post.imageUrl,
    },
  });

  useEffect(() => {
    if (post.imageUrl) {
      setValue("imageUrl", post.imageUrl);
    }
  }, [post.imageUrl, setValue]);

  const editPostMutation = useMutation({
    mutationFn: async (data: { title: string; content: string; imageUrl: string }) => {
      const response = await axios.patch<Post>(`/api/posts/${post.id}`, data);
      return response.data;
    },
    onSuccess: (updatedPost) => {
      onUpdate(updatedPost);
      onClose();
    },
    onError: (error) => {
      console.error("Error updating post:", error);
      alert("게시글 수정에 실패했습니다.");
    },
  });

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201 && response.data?.url) {
        return response.data.url;
      }

      throw new Error("이미지 업로드 실패");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      throw error;
    }
  }, []);

  const onSubmit = async (data: { title: string; content: string; imageUrl: string }) => {
    editPostMutation.mutate(data);
  };

  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg border border-gray-300 bg-white">
        <div className="p-6">
          <h2 className="mb-4 text-2xl font-bold">게시글 수정</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                제목
              </label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "제목을 입력하세요." }}
                render={({ field }) => (
                  <BaseInput
                    {...field}
                    type="text"
                    variant="white"
                    size="w-full h-[52px]"
                    placeholder="제목을 입력하세요"
                  />
                )}
              />
            </div>
            <div>
              <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                내용
              </label>
              <Controller
                name="content"
                control={control}
                rules={{ required: "내용을 입력하세요." }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="h-[240px] w-full resize-none rounded-lg bg-background-200 p-[14px] text-[16px] placeholder:text-grayscale-400 focus:outline-none focus:ring-2 focus:ring-primary-orange-300"
                    placeholder="내용을 입력하세요"
                  />
                )}
              />
            </div>
            <div>
              <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
                이미지
              </label>
              <ImageInputWithPlaceHolder
                onImageUpload={uploadImage}
                onImagesChange={(newImages) => {
                  const imageUrls = newImages.map((img) => img.url).join(",");
                  setValue("imageUrl", imageUrls);
                }}
                size="small"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button onClick={onClose} variant="outlined">
                취소
              </Button>
              <Button type="submit" disabled={editPostMutation.isPending}>
                {editPostMutation.isPending ? "수정 중..." : "수정하기"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
