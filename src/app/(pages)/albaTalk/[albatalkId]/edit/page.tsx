"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/default/Button";
import BaseInput from "@/app/components/input/text/BaseInput";
import ImageInputPlaceHolder from "@/app/components/input/file/ImageInput/ImageInputPlaceHolder";
import { useEditPost } from "@/hooks/queries/post/useEditPost";
import { usePostDetail } from "@/hooks/queries/post/usePostDetail";
import axios from "axios";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { PostSchema } from "@/schemas/postSchema";
import toast from "react-hot-toast";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

interface ImageInputType {
  file: File | null;
  url: string;
  id: string;
}

export default function EditTalk({ params }: { params: { albatalkId: string } }) {
  const [imageList, setImageList] = useState<ImageInputType[]>([]);
  const router = useRouter();
  const postId = params.albatalkId;

  const { data: post, isLoading, error } = usePostDetail(postId);
  const { mutate: editPost, isPending } = useEditPost(postId);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<PostSchema>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  // 게시글 데이터로 폼 초기화
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl || "",
      });

      if (post.imageUrl) {
        setImageList([
          {
            file: null,
            url: post.imageUrl,
            id: "initial-image",
          },
        ]);
      } else {
        setImageList([]);
      }
    }
  }, [post, reset]);

  // 에러 처리
  useEffect(() => {
    if (error) {
      toast.error("게시글을 불러오는데 실패했습니다.");
      router.push("/albatalk");
    }
  }, [error, router]);

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

      throw new Error("이미지 업로드에 실패했습니다.");
    } catch (error) {
      toast.error("이미지 업로드에 실패했습니다.");
      console.error("이미지 업로드 실패:", error);
      throw error;
    }
  }, []);

  const handleImagesChange = useCallback(
    (newImages: ImageInputType[]) => {
      setImageList(newImages);
      const imageUrls = newImages.map((img) => img.url).join(",");
      setValue("imageUrl", imageUrls);
    },
    [setValue]
  );

  const onSubmit: SubmitHandler<PostSchema> = async (data) => {
    try {
      if (!data.title) {
        toast.error("제목을 입력하세요.");
        return;
      }

      if (!data.content) {
        toast.error("내용을 입력하세요.");
        return;
      }

      const postData: PostSchema = {
        title: data.title,
        content: data.content,
        imageUrl: imageList.map((img) => img.url).join(","),
      };

      editPost(postData, {
        onSuccess: () => {
          router.push(`/albatalk/${postId}`);
        },
      });
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="flex w-full flex-col bg-grayscale-50 px-6 font-nexon lg:px-10">
      <div className="w-full max-w-[1480px] rounded-md bg-white">
        <div className="mb-[40px] flex h-[58px] w-full items-center justify-between border-b border-line-100 md:h-[78px] lg:h-[126px]">
          <div className="flex items-center text-[18px] font-semibold md:text-[20px] lg:text-[32px]">
            게시글 수정하기
          </div>
          <div className="hidden space-x-1 font-semibold md:flex md:space-x-2 lg:space-x-4">
            <Button
              color="gray"
              className="text-grayscale-50md:h-[46px] text-white md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
              onClick={() => router.push("/albaTalk")}
            >
              취소
            </Button>
            <Button
              className="text-grayscale-50 md:h-[46px] md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? <DotLoadingSpinner /> : "수정하기"}
            </Button>
          </div>
        </div>
        <form className="mx-auto max-w-[1432px] space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            <label
              htmlFor="title"
              className="mb-2 flex items-center text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
            >
              제목<span className="ml-1 text-primary-orange-300">*</span>
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
                  name="title"
                  size="w-full h-[52px] md:h-[54px] lg:h-[64px]"
                  placeholder="제목을 입력하세요"
                  errormessage={errors.title?.message}
                />
              )}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="content"
              className="mb-2 flex items-center text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
            >
              내용<span className="ml-1 text-primary-orange-300">*</span>
            </label>
            <Controller
              name="content"
              control={control}
              rules={{ required: "내용을 입력하세요." }}
              render={({ field }) => (
                <textarea
                  {...field}
                  className="h-[240px] w-full resize-none rounded-lg bg-background-200 p-[14px] text-[16px] placeholder:text-grayscale-400 focus:outline-none focus:ring-2 focus:ring-primary-orange-300 md:text-[18px] lg:text-[20px]"
                  placeholder="내용을 입력하세요"
                />
              )}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="image"
              className="mb-2 block text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
            >
              이미지
            </label>
            <ImageInputPlaceHolder
              onImageUpload={uploadImage}
              onImagesChange={handleImagesChange}
              initialImages={imageList}
            />
          </div>
        </form>
      </div>
      {/* 모바일 버전 버튼 */}
      <div className="flex w-full flex-col items-center justify-center space-y-2 rounded-t-lg bg-white py-10 font-semibold md:hidden">
        <Button
          color="gray"
          className="mb-2 h-[58px] w-full rounded-[8px] bg-grayscale-100 text-white hover:bg-grayscale-200"
          onClick={() => router.push("/albaTalk")}
        >
          취소
        </Button>
        <Button
          className="h-[58px] w-full rounded-[8px] bg-primary-orange-300 text-white hover:bg-orange-400"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? <DotLoadingSpinner /> : "수정하기"}
        </Button>
      </div>
    </div>
  );
}
