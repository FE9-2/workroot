"use client";
import { HiUpload } from "react-icons/hi";
import { forwardRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import PreviewItem from "./PreviewItem";
import { cn } from "@/lib/tailwindUtil";
import { ImageInputType } from "@/types/addform";

interface ImageInputProps {
  name: string;
  onChange?: (files: File[]) => void;
  onDelete?: (id: string) => void;
  initialImageList: ImageInputType[];
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>((props, ref) => {
  const [imageList, setImageList] = useState<ImageInputType[]>(props.initialImageList || []);

  useEffect(() => {
    if (props.initialImageList?.length > 0) {
      setImageList(props.initialImageList);
    }
  }, [props.initialImageList, imageList]);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드할 수 있습니다.");
        return;
      } else if (selectedFile && imageList.length >= 3) {
        toast.error("이미지는 최대 3개까지 업로드할 수 있습니다.");
        return;
      }
      props.onChange?.([selectedFile]); // 파일을 상위로 전달하면 url이 prop으로 내려옴
    }
  };

  const handleDeleteImage = (targetUrl: string) => {
    // 삭제 했을때 다른 이미지 미리보기도 엑박뜨는 현상 있음 !
    const newImageList = imageList.filter((image) => image.url !== targetUrl);
    setImageList(newImageList);
    // 제거한 리스트를 상위에서 setValue
    props.onDelete?.(targetUrl);
  };

  const handleOpenFileSelector = () => {
    if (typeof ref === "function") {
      // input 요소를 찾아서 클릭
      const fileInput = document.querySelector(`input[name="${props.name}"]`);
      if (fileInput) {
        (fileInput as HTMLInputElement).click();
      }
    } else if (ref && "current" in ref) {
      ref.current?.click();
    }
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
        onClick={handleOpenFileSelector}
        className={cn(
          "relative size-20 cursor-pointer rounded-lg lg:size-[116px]",
          colorStyle.bgColor,
          colorStyle.borderColor,
          colorStyle.hoverColor
        )}
      >
        <input
          ref={ref}
          type="file"
          name={props.name}
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        <div className="pointer-events-none absolute top-0 z-10 p-7 lg:p-10">
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
