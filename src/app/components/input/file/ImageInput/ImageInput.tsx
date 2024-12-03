"use client";
import BaseFileInput from "../BaseFileInput";
import { HiUpload } from "react-icons/hi";
import { forwardRef, useState } from "react";
import { toast } from "react-hot-toast";
import PreviewItem from "./PreviewItem";
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
