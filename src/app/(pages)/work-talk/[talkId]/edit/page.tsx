"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler, Controller, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/default/Button";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useEditPost } from "@/hooks/queries/post/useEditPost";
import { usePostDetail } from "@/hooks/queries/post/usePostDetail";
import axios from "axios";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { PostSchema } from "@/schemas/postSchema";
import toast from "react-hot-toast";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import { useQueryClient } from "@tanstack/react-query";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";
import { ImageInputType } from "@/types/addform";

export default function EditTalk({ params }: { params: { talkId: string } }) {
  const methods = useForm<PostSchema>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = methods;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ImageInputType[]>([]);
  const router = useRouter();
  const postId = params.talkId;

  const { data: post, isLoading, error } = usePostDetail(postId);
  const { mutate: editPost, isPending } = useEditPost(postId);
  const queryClient = useQueryClient();

  // 게시글 데이터로 폼 초기화
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl || "",
      });

      // 이미지 초기화
      if (post.imageUrl) {
        const initialImages = post.imageUrl.split(",").map((url) => ({
          url,
          id: crypto.randomUUID(),
        }));
        setUploadedImages(initialImages);
      }
    }
  }, [post, reset]);

  // 에러 처리
  useEffect(() => {
    if (error) {
      toast.error("게시글을 불러오는데 실패했습니다.");
      router.push("/work-talk");
    }
  }, [error, router]);

  const uploadImage = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      throw error;
    }
  }, []);

  const onSubmit: SubmitHandler<PostSchema> = async (data) => {
    try {
      if (!data.title || !data.content) {
        toast.error("제목과 내용을 입력하세요.");
        return;
      }

      if (isUploading) {
        toast.error("이미지 업로드가 완료될 때까지 기다려주세요.");
        return;
      }

      const postData: PostSchema = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
      };

      editPost(postData, {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: [
              "posts",
              {
                limit: 10,
                orderBy: null,
              },
            ],
          });
          await queryClient.invalidateQueries({
            queryKey: ["post", postId],
          });
          router.push(`/work-talk/${postId}`);
        },
      });
    } catch (error) {
      console.error("게시글 수정 실패:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!post) return null;

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col bg-grayscale-50 px-6 font-nexon lg:px-10">
        <div className="w-full max-w-[1480px] rounded-md bg-white">
          <div className="mb-[40px] flex h-[58px] w-full items-center justify-between border-b border-line-100 md:h-[78px] lg:h-[126px]">
            <div className="flex items-center text-[18px] font-semibold md:text-[20px] lg:text-[32px]">게시글 수정</div>
            <div className="hidden space-x-1 font-semibold md:flex md:space-x-2 lg:space-x-4">
              <Button
                color="gray"
                className="text-grayscale-50md:h-[46px] text-white md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
                onClick={() => router.push("/work-talk")}
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
                    className="h-[240px] w-full resize-none rounded-lg bg-background-200 p-[14px] text-[16px] placeholder:text-grayscale-400 focus:border-[0.5px] focus:border-primary-orange-300 focus:outline-none md:text-[18px] lg:text-[20px]"
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
              <div className="relative">
                <ImageInput
                  name="images"
                  initialImageList={uploadedImages}
                  onChange={async (files) => {
                    // DnD로 인해 string[] 들어오는 경우는 스킵
                    if (files.length > 0 && files[0] instanceof File) {
                      setIsUploading(true);
                      try {
                        // 업로드
                        const uploadPromises = (files as File[]).map((file) => uploadImage(file));
                        const uploadedUrls = await Promise.all(uploadPromises);

                        // 미리보기용 state에도 추가
                        const newImages: ImageInputType[] = uploadedUrls.map((url) => ({
                          id: crypto.randomUUID(),
                          url,
                        }));
                        setUploadedImages((prev) => [...prev, ...newImages]);

                        // RHF에도 이미지 URL 병합
                        const oldValue = methods.getValues("imageUrl");
                        const merged = oldValue ? oldValue + "," + uploadedUrls.join(",") : uploadedUrls.join(",");
                        setValue("imageUrl", merged, { shouldDirty: true });
                      } catch (error) {
                        console.error("이미지 업로드 실패:", error);
                      } finally {
                        setIsUploading(false);
                      }
                    }
                    // DnD 재정렬로 string[]이 들어오면, 순서가 바뀐 이미지 목록을 반영
                    else if (files.length > 0 && typeof files[0] === "string") {
                      const newOrder: ImageInputType[] = (files as string[]).map((url) => {
                        const found = uploadedImages.find((img) => img.url === url);
                        if (found) return found;
                        return { id: crypto.randomUUID(), url };
                      });
                      setUploadedImages(newOrder);
                      setValue("imageUrl", newOrder.map((i) => i.url).join(","), {
                        shouldDirty: true,
                      });
                    }
                  }}
                  onDelete={(url) => {
                    const newImages = uploadedImages.filter((img) => img.url !== url);
                    setUploadedImages(newImages);
                    setValue("imageUrl", newImages.map((img) => img.url).join(","), {
                      shouldDirty: true,
                    });
                  }}
                />
                {isUploading && (
                  <div className="absolute left-0 top-0 z-40 flex size-[80px] items-center justify-center rounded-lg bg-background-300 lg:size-[116px]">
                    <DotLoadingSpinner />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* 모바일 버전 버튼 */}
        <div className="flex w-full flex-col items-center justify-center space-y-2 rounded-t-lg bg-white py-10 font-semibold md:hidden">
          <Button
            color="gray"
            className="mb-2 h-[58px] w-full rounded-[8px] bg-grayscale-100 text-white hover:bg-grayscale-200"
            onClick={() => router.push("/work-talk")}
          >
            취소
          </Button>
          <Button
            className="h-[58px] w-full rounded-[8px] bg-primary-orange-300 text-white hover:bg-primary-orange-400"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            {isPending ? <DotLoadingSpinner /> : "수정하기"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
