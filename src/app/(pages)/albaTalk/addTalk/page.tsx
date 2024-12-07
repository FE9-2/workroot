"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Button from "../../../components/button/default/Button";
import BaseInput from "@/app/components/input/text/BaseInput";
import ImageInputwithPlaceHolder from "../../../components/input/file/ImageInput/ImageInputwithPlaceHolder";
import { usePost } from "../../../../hooks/usePost";

interface FormInputs {
  title: string;
  content: string;
  imageUrl?: string;
}

export default function AddTalk() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({ defaultValues: { title: "", content: "" } });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();
  const { mutate: createPost, isPending } = usePost();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (!data.title || !data.content) {
      alert("제목과 내용을 입력하세요.");
      return;
    }

    const postData = {
      ...data,
      imageUrl: imageUrls.join(","),
    };

    console.log("폼 데이터 확인:", postData);

    createPost(postData, {
      onSuccess: (response) => {
        alert("게시글이 등록되었습니다.");
        const boardId = response?.id;
        router.push(`/boards/${boardId}`);
      },
      onError: (err) => {
        alert(err.message || "게시글 등록에 실패했습니다.");
      },
    });
  };

  useEffect(() => {
    const handleImageListChanged = (event: CustomEvent) => {
      const urls = event.detail.urls; // 이벤트에서 전달된 URL 리스트
      console.log("업데이트된 이미지 URL:", urls); // 디버깅용
      setImageUrls(urls);
      setValue("imageUrl", urls.join(",")); // React Hook Form에 동기화
    };

    window.addEventListener("imageListChanged", handleImageListChanged as EventListener);

    return () => {
      window.removeEventListener("imageListChanged", handleImageListChanged as EventListener);
    };
  }, [setValue]);

  const handleImageClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-start justify-center bg-grayscale-50 py-8 font-nexon">
        <div className="w-full max-w-[1480px] rounded-md bg-white px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="mb-[40px] flex h-[58px] w-full items-center justify-between border-b border-[#line-100] md:h-[78px] lg:h-[126px]">
            <h1 className="flex items-center text-[18px] font-semibold md:text-[20px] lg:text-[32px]">글쓰기</h1>
            <div className="hidden space-x-1 font-semibold md:flex md:space-x-2 lg:space-x-4">
              <Button
                variant="solid"
                className="bg-grayscale-100 text-grayscale-50 hover:bg-grayscale-200 md:h-[46px] md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
                onClick={() => router.push("/albaTalk")}
              >
                취소
              </Button>
              <Button
                variant="solid"
                className="bg-primary-orange-300 text-grayscale-50 hover:bg-orange-400 md:h-[46px] md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
              >
                {isPending ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </div>
          <form
            className="mx-auto max-w-[1432px] space-y-6 px-2 sm:px-0 md:space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  <div className="relative w-full">
                    <BaseInput
                      {...field}
                      type="text"
                      variant="white"
                      name="content"
                      size="w-full h-[180px] md:h-[200px] lg:h-[240px]"
                      placeholder=""
                      errormessage={errors.content?.message}
                      wrapperClassName="!items-start"
                      innerClassName="opacity-0 !h-full"
                    />
                    <textarea
                      {...field}
                      className="absolute left-0 top-0 h-full w-full resize-none rounded-lg bg-background-200 p-[14px] placeholder:text-grayscale-400 focus:outline-none focus:ring-2 focus:ring-primary-orange-300 lg:py-[18px]"
                      placeholder="내용을 입력하세요"
                    />
                  </div>
                )}
              />
            </div>

            <div className="w-full" onClick={handleImageClick}>
              <label
                htmlFor="image"
                className="mb-2 block text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
              >
                이미지
              </label>
              <ImageInputwithPlaceHolder />
            </div>
          </form>
        </div>
      </div>
      {/* 모바일 버전 버튼 */}
      <div className="fixed bottom-4 left-4 right-4 flex w-full flex-col items-center space-y-2 rounded-t-lg bg-white p-4 font-semibold md:hidden">
        <button
          className="mb-2 h-[58px] w-[327px] rounded-[8px] bg-grayscale-100 text-white hover:bg-grayscale-200"
          onClick={() => router.push("/albaTalk")}
        >
          취소
        </button>
        <button
          className="h-[58px] w-[327px] rounded-[8px] bg-primary-orange-300 text-white hover:bg-orange-400"
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        >
          {isPending ? "등록 중..." : "등록하기"}
        </button>
      </div>
    </>
  );
}
