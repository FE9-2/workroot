// AddTalk.tsx

"use client";

import React, { useState, useCallback } from "react";
import { useForm, SubmitHandler, Controller, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "@/app/components/button/default/Button";
import BaseInput from "@/app/components/input/text/BaseInput";
import { useAddPost } from "@/hooks/queries/post/useAddPost";
import axios from "axios";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLoadingSpinner";
import { PostSchema } from "@/schemas/postSchema";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ImageInput from "@/app/components/input/file/ImageInput/ImageInput";

// ImageInput에서 사용하는 타입 (PreviewItem 등에 필요)
import { ImageInputType } from "@/types/addform";

export default function AddTalk() {
  const methods = useForm<PostSchema>({
    defaultValues: {
      title: "",
      content: "",
      imageUrl: "", // 여러 개면 "url1,url2" 형태로 관리
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = methods;
  const [isUploading, setIsUploading] = useState(false);

  // 업로드된 이미지들을 저장해놓을 state
  // ImageInputType = { id: string; url: string; ... } 형태
  const [uploadedImages, setUploadedImages] = useState<ImageInputType[]>([]);

  const router = useRouter();
  const { mutate: createPost, isPending } = useAddPost();
  const queryClient = useQueryClient();

  // 이미지 업로드 API
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

  // 폼 전송
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

      // imageUrl이 "url1,url2"로 합쳐져 있음
      const postData: PostSchema = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
      };

      createPost(postData, {
        onSuccess: async (response) => {
          // 캐시 무효화
          await queryClient.invalidateQueries({
            queryKey: [
              "posts",
              {
                limit: 10,
                orderBy: null,
              },
            ],
          });
          // 업로드 완료 후 상세 페이지 이동
          router.push(`/work-talk/${response.id}`);
        },
      });
    } catch (error) {
      console.error("게시글 등록 실패:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex w-full flex-col bg-grayscale-50 px-6 font-nexon lg:px-10">
        <div className="w-full max-w-[1480px] rounded-md bg-white">
          <div className="mb-[40px] flex h-[58px] w-full items-center justify-between border-b border-line-100 md:h-[78px] lg:h-[126px]">
            <div className="flex items-center text-[18px] font-semibold md:text-[20px] lg:text-[32px]">게시글 쓰기</div>
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
                {isPending ? <DotLoadingSpinner /> : "등록하기"}
              </Button>
            </div>
          </div>

          <form className="mx-auto max-w-[1432px] space-y-6 md:space-y-8" onSubmit={handleSubmit(onSubmit)}>
            {/* 제목 */}
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

            {/* 내용 */}
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

            {/* 이미지 */}
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
                  // 1) 업로드된 이미지를 미리보이도록 initialImageList에 넘겨줌
                  initialImageList={uploadedImages}
                  // 2) 새로 업로드된 파일들에 대한 처리
                  onChange={async (files) => {
                    // (DnD로 인해 string[] 들어오는 경우는 스킵)
                    if (files.length > 0 && files[0] instanceof File) {
                      setIsUploading(true);
                      try {
                        // 업로드
                        const uploadPromises = (files as File[]).map((file) => uploadImage(file));
                        const uploadedUrls = await Promise.all(uploadPromises);

                        // 2-1) 미리보기용 state에도 추가
                        const newImages: ImageInputType[] = uploadedUrls.map((url, idx) => ({
                          id: `image-${Date.now()}-${idx}`,
                          url,
                        }));
                        setUploadedImages((prev) => [...prev, ...newImages]);

                        // 2-2) RHF에도 이미지 URL 병합
                        //     (기존 imageUrl + 새 URL)
                        const oldValue = methods.getValues("imageUrl"); // ex) "url1,url2"
                        const merged = oldValue ? oldValue + "," + uploadedUrls.join(",") : uploadedUrls.join(",");

                        setValue("imageUrl", merged, { shouldDirty: true });
                      } catch (error) {
                        console.error("이미지 업로드 실패:", error);
                      } finally {
                        setIsUploading(false);
                      }
                    }
                    // 3) DnD 재정렬로 string[]이 들어오면, 순서가 바뀐 이미지 목록을 반영
                    else if (files.length > 0 && typeof files[0] === "string") {
                      // files: string[] 형태로 URL 목록이 들어옴
                      // 이제 uploadedImages를 해당 순서에 맞게 재정렬
                      const newOrder: ImageInputType[] = (files as string[]).map((url) => {
                        // 기존 state에서 찾기
                        const found = uploadedImages.find((img) => img.url === url);
                        if (found) return found;
                        // 혹은 없는 경우 새로 만들 수도 있음(예외적)
                        return { id: `image-${Date.now()}`, url };
                      });
                      setUploadedImages(newOrder);
                      // RHF에도 순서 반영해주고 싶다면:
                      setValue("imageUrl", newOrder.map((i) => i.url).join(","), {
                        shouldDirty: true,
                      });
                    }
                  }}
                />
                {/* 업로드 진행중이면 로딩스피너 표시 */}
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
            {isPending ? <DotLoadingSpinner /> : "등록하기"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
