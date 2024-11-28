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
const ImageInput = () => {
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

  return (
    <div className="flex gap-5 lg:gap-6">
      <div className="relative">
        <BaseFileInput
          file={null}
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
      {imageList.map((image) => (
        <PreviewItem key={image.id} image={image} handleDeleteImage={handleDeleteImage} placeholder={false} />
      ))}
    </div>
  );
};

export default ImageInput;
