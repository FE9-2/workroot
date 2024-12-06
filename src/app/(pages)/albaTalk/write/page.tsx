"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../components/button/default/Button";
import BaseTextArea from "../../../components/input/textarea/BaseTextArea";
import ImageInputwithPlaceHolder from "../../../components/input/file/ImageInput/ImageInputwithPlaceHolder";
import { usePost } from "../../../../hooks/usePost";

export default function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageList, setImageList] = useState<string[]>([]);
  const router = useRouter();

  const { mutate: createPost, isPending, error } = usePost();

  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const imageUrl = imageList.length > 0 ? imageList.join(",") : undefined;

    createPost(
      { title, content, imageUrl },
      {
        onSuccess: () => {
          alert("게시글이 등록되었습니다.");
          router.push("/albaTalk");
        },
        onError: (err: Error) => {
          alert(err.message || "게시글 등록에 실패했습니다.");
        },
      }
    );
  };

  // DOM에서 업로드된 이미지의 URL을 수집하여 imageList 상태로 업데이트.
  const syncImageList = () => {
    const images = document.querySelectorAll<HTMLElement>(".image-preview-item");
    const urls = Array.from(images).map((img) => img.dataset.url || "");
    setImageList(urls.filter((url) => url));
  };

  return (
    <>
      <div className="flex min-h-screen w-full items-start justify-center bg-gray-50 py-8 font-nexon">
        <div className="w-full max-w-[1480px] rounded-md bg-white px-6 md:px-4 lg:px-6">
          <div className="mb-[40px] flex h-[58px] w-full items-center justify-between border-b border-[#line-100] md:h-[78px] lg:h-[126px]">
            <h1 className="flex items-center text-[18px] font-semibold md:text-[20px] lg:text-[32px]">글쓰기</h1>
            <div className="hidden space-x-1 md:flex md:space-x-2 lg:space-x-4">
              <Button
                variant="solid"
                className="bg-gray-100 text-gray-50 hover:bg-gray-200 md:h-[46px] md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
                onClick={() => router.push("/albaTalk")}
              >
                취소
              </Button>
              <Button
                variant="solid"
                className="bg-primary-orange-300 text-gray-50 hover:bg-orange-400 md:h-[46px] md:w-[108px] md:text-[14px] lg:h-[58px] lg:w-[180px] lg:text-[18px]"
                onClick={() => {
                  syncImageList();
                  handleSubmit();
                }}
                disabled={isPending}
              >
                {isPending ? "등록 중..." : "등록하기"}
              </Button>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="w-full">
              <label
                htmlFor="title"
                className="mb-2 flex items-center text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
              >
                제목<span className="ml-1 text-primary-orange-300">*</span>
              </label>
              <BaseTextArea
                variant="white"
                name="title"
                size="w-full h-[52px] md:h-[54px] lg:h-[64px] lg:w-[1432px]"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="content"
                className="mb-2 flex items-center text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
              >
                내용<span className="ml-1 text-primary-orange-300">*</span>
              </label>
              <BaseTextArea
                variant="white"
                name="content"
                size="w-full h-[180px] md:h-[200px] lg:h-[240px] lg:w-[1432px]"
                placeholder="내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="image"
                className="mb-2 block text-[16px] font-medium text-black-300 md:text-[18px] lg:text-[20px]"
              >
                이미지
              </label>
              <ImageInputwithPlaceHolder />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 버전 버튼 */}
      <div className="w-full md:hidden">
        <div className="fixed bottom-4 left-0 right-0 flex flex-col items-center space-y-2 rounded-t-lg bg-white p-4">
          {/* 모바일 버튼 간격 조정 */}
          <button
            className="mb-2 h-[58px] w-[327px] rounded-[8px] bg-gray-200 text-white hover:bg-gray-300"
            onClick={() => router.push("/albaTalk")}
          >
            취소
          </button>
          <button
            className="h-[58px] w-[327px] rounded-[8px] bg-primary-orange-300 text-white hover:bg-orange-400"
            onClick={() => {
              syncImageList(); // 이미지 리스트 동기화
              handleSubmit();
            }}
          >
            등록하기
          </button>
        </div>
      </div>
    </>
  );
}
