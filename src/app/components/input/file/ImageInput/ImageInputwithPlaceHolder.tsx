"use client";
import BaseFileInput from "../BaseFileInput";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";
import { toast } from "react-hot-toast";
import PreviewItem from "./PreviewItem";
interface ImageInputType {
  file: File | null;
  url: string;
  id: string;
}
const ImageInputwithPlaceHolder = () => {
  const [imageList, setImageList] = useState<ImageInputType[]>([]);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드할 수 있습니다.");
        return;
      } else if (selectedFile && imageList.length >= 3) {
        toast.error("이미지는 최대 3개까지 업로드할 수 있습니다.");
        return;
      }
      setImageList((prev) => [
        ...prev,
        { file: selectedFile, url: URL.createObjectURL(selectedFile), id: crypto.randomUUID() },
      ]);
    }
  };

  const handleDeleteImage = (targetId: string) => {
    setImageList((prev) => prev.filter((image) => image.id !== targetId));
  };

  const size = "size-[160px] lg:size-[240px]";

  return (
    <div className="flex gap-5 lg:gap-6">
      <div className="relative">
        <BaseFileInput
          file={null}
          variant="upload"
          name="image"
          onFileAction={handleFileChange}
          size={size}
          isImage={true}
          placeholder=""
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <HiUpload className="text-[36px] text-gray-200" />
          <p className="mt-2 text-gray-500">이미지 넣기</p>
        </div>
      </div>
      {imageList.map((image) => (
        <PreviewItem key={image.id} image={image} handleDeleteImage={handleDeleteImage} placeholder={true} />
      ))}
    </div>
  );
};

export default ImageInputwithPlaceHolder;
