"use client";
import { HiUpload } from "react-icons/hi";
import { forwardRef, useState } from "react";
import { toast } from "react-hot-toast";
import PreviewItem from "./PreviewItem";
import { cn } from "@/lib/tailwindUtil";
interface ImageInputType {
  file: File | null;
  url: string;
  id: string;
}

interface ImageInputProps {
  name: string;
  onChange?: (files: File[]) => void;
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>((props, ref) => {
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

      const newImageList = [
        ...imageList,
        {
          file: selectedFile,
          url: URL.createObjectURL(selectedFile),
          id: crypto.randomUUID(),
        },
      ];

      setImageList(newImageList);

      props.onChange?.(newImageList.map((img) => img.file).filter((file) => file !== null));
    }
  };

  const handleDeleteImage = (targetId: string) => {
    const newImageList = imageList.filter((image) => image.id !== targetId);
    setImageList(newImageList);
    props.onChange?.(newImageList.map((img) => img.file).filter((file) => file !== null));
  };

  const colorStyle = {
    bgColor: "bg-background-200",
    borderColor: "border-[0.5px] border-transparent",
    hoverColor: "hover:border-grayscale-200 hover:bg-background-300",
    innerHoverColor: "hover:bg-background-300",
  };

  return (
    // 인풋 + 프리뷰 wrapper
    <div className="flex gap-5 lg:gap-6">
      <div
        className={cn(
          "relative size-20 rounded-lg lg:size-[116px]",
          colorStyle.bgColor,
          colorStyle.borderColor,
          colorStyle.hoverColor
        )}
      >
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        <div className="pointer-events-none absolute top-0 p-7 lg:p-10">
          <HiUpload className="text-[24px] text-grayscale-400 lg:text-[36px]" />
        </div>
      </div>
      {imageList.map((image) => (
        <PreviewItem key={image.id} image={image} handleDeleteImage={handleDeleteImage} placeholder={false} />
      ))}
    </div>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
