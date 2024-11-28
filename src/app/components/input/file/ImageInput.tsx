"use client";
import BaseFileInput from "./BaseFileInput";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";

const ImageInput = () => {
  const [image, setImage] = useState<{ file: File | null; url: string }>({
    file: null,
    url: "",
  });

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드할 수 있습니다.");
        return;
      }
      setImage({ file: selectedFile, url: URL.createObjectURL(selectedFile) });
    } else {
      setImage({ file: null, url: "" });
    }
  };

  const handleDeleteImage = () => {
    URL.revokeObjectURL(image.url);
    setImage({ file: null, url: "" });
  };

  return (
    <div className="flex gap-5 lg:gap-6">
      <div className="relative">
        <BaseFileInput
          file={image.file}
          variant="upload"
          name="image"
          onFileAction={handleFileChange}
          size="size-20 lg:size-[116px]"
          isImage={true}
          placeholder=""
        />
        <div className="pointer-events-none absolute top-0 p-7 lg:p-10">
          <HiUpload className="text-[24px] text-gray-400 lg:text-[36px]" />
        </div>
      </div>
      {image.url && (
        <div className="relative size-20 lg:size-[116px]">
          {/* 이미지 미리보기 */}
          <Image src={image.url} alt="미리보기" fill objectFit="cover" className="overflow-hidden rounded-lg" />
          <div
            onClick={handleDeleteImage}
            className="absolute -right-2 -top-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full lg:-right-3 lg:-top-3 lg:size-9"
          >
            <Image src={"/icons/x/x-circle-md.svg"} alt="삭제" height={24} width={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
