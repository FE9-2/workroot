"use client";
import { HiUpload } from "react-icons/hi";
import { forwardRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import PreviewItem from "./PreviewItem";
import { cn } from "@/lib/tailwindUtil";
import { ImageInputType } from "@/types/addform";
import React from "react";

interface ImageInputProps {
  name: string;
  onChange?: (files: File[] | string[]) => void;
  onDelete?: (id: string) => void;
  initialImageList: ImageInputType[];
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>((props, ref) => {
  const [imageList, setImageList] = useState<ImageInputType[]>(props.initialImageList || []);

  useEffect(() => {
    if (props.initialImageList?.length > 0) {
      setImageList(props.initialImageList);
    }
  }, [props.initialImageList]);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles); // FileList를 배열로 변환
      const validFiles = filesArray.filter((file) => file.type.startsWith("image/"));

      if (validFiles.length + imageList.length > 3) {
        toast.error("이미지는 최대 3개까지 업로드할 수 있습니다.");
        return;
      }

      if (validFiles.length === 0) {
        toast.error("이미지 파일만 업로드할 수 있습니다.");
        return;
      }

      // 선택된 파일을 상위 컴포넌트로 전달
      props.onChange?.(validFiles);
    }
  };

  const handleDeleteImage = (targetUrl: string) => {
    const newImageList = imageList.filter((image) => image.url !== targetUrl);
    setImageList(newImageList);
    props.onDelete?.(targetUrl);
  };

  const handleOpenFileSelector = () => {
    if (typeof ref === "function") {
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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(imageList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageList(items);
    // 상위 컴포넌트에 변경된 이미지 URL 배열 전달
    props.onChange?.(items.map((item) => item.url));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
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
            onChange={(e) => handleFileChange(e.target.files)}
            className="hidden"
            multiple
          />
          <div className="pointer-events-none absolute top-0 z-10 p-7 lg:p-10">
            <HiUpload className="text-[24px] text-grayscale-400 lg:text-[36px]" />
          </div>
        </div>
        <Droppable droppableId="image-list" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-5 lg:gap-6">
              {imageList.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <PreviewItem image={image} handleDeleteImage={handleDeleteImage} placeholder={false} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
});

ImageInput.displayName = "ImageInput";

export default ImageInput;
