"use client";
import { HiUpload } from "react-icons/hi";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import PreviewItem from "./PreviewItem";

interface ImageInputType {
  file: File | null;
  url: string;
  id: string;
}

interface ImageInputwithPlaceHolderProps {
  onImageUpload: (file: File) => Promise<string>;
  onImagesChange: (images: ImageInputType[]) => void;
}

const ImageInputwithPlaceHolder: React.FC<ImageInputwithPlaceHolderProps> = ({ onImageUpload, onImagesChange }) => {
  const [imageList, setImageList] = useState<ImageInputType[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드할 수 있습니다.");
        return;
      } else if (imageList.length >= 3) {
        toast.error("이미지는 최대 3개까지 업로드할 수 있습니다.");
        return;
      }
      try {
        const uploadedUrl = await onImageUpload(selectedFile);
        const newImageList = [...imageList, { file: null, url: uploadedUrl, id: crypto.randomUUID() }];
        setImageList(newImageList);
        onImagesChange(newImageList);
      } catch (error) {
        console.error("이미지 업로드 중 오류:", error);
        toast.error("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const handleDeleteImage = (targetId: string) => {
    const newImageList = imageList.filter((image) => image.id !== targetId);
    setImageList(newImageList);
    onImagesChange(newImageList);
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const size = "size-[160px] lg:size-[240px]";

  return (
    <div className="flex gap-5 lg:gap-6">
      <div className="relative">
        <button
          type="button"
          onClick={handleImageButtonClick}
          className={`${size} flex flex-col items-center justify-center bg-gray-100 hover:bg-gray-200`}
        >
          <HiUpload className="text-[36px] text-grayscale-200" />
          <p className="mt-2 text-grayscale-500">이미지 넣기</p>
        </button>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
      </div>
      {imageList.map((image) => (
        <PreviewItem key={image.id} image={image} handleDeleteImage={handleDeleteImage} placeholder={true} />
      ))}
    </div>
  );
};

export default ImageInputwithPlaceHolder;
