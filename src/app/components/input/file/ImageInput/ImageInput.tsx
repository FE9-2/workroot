"use client";

import { HiUpload } from "react-icons/hi";
import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import PreviewItem from "./PreviewItem";
import { cn } from "@/lib/tailwindUtil";
import { ImageInputType } from "@/types/addform";

interface ImageInputProps {
  name: string;
  /**
   * onChange는 File[] 또는 string[]을 받습니다.
   * - 새로 업로드되는 경우: File[]
   * - DnD 재정렬만 있을 경우: string[]
   */
  onChange?: (files: File[] | string[]) => void;
  onDelete?: (id: string) => void;
  initialImageList?: ImageInputType[];
}

export default function ImageInput({ name, onChange, onDelete, initialImageList = [] }: ImageInputProps) {
  /** 내부에서 직접 file input을 제어 */
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageList, setImageList] = useState<ImageInputType[]>(initialImageList);
  const [enabled, setEnabled] = useState(false); // DnD 활성화 상태

  useEffect(() => {
    // 컴포넌트 초기 마운트 후 DnD 허용
    setEnabled(true);
  }, []);

  // initialImageList가 바뀌면 state 갱신
  useEffect(() => {
    if (initialImageList?.length > 0) {
      setImageList(initialImageList);
    }
  }, [initialImageList]);

  /** 파일 변경 콜백 */
  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const filesArray = Array.from(selectedFiles);
    const validFiles = filesArray.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length + imageList.length > 3) {
      toast.error("이미지는 최대 3개까지 업로드할 수 있습니다.");
      return;
    }

    if (validFiles.length === 0) {
      toast.error("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    // 새 파일 업로드 시 File[]를 상위에 전달
    onChange?.(validFiles);
  };

  /** 이미지 개별 삭제 */
  const handleDeleteImage = (targetUrl: string) => {
    const newImageList = imageList.filter((image) => image.url !== targetUrl);
    setImageList(newImageList);
    onDelete?.(targetUrl);
  };

  /** 업로드 버튼 누르면 input[type="file"] 오픈 */
  const handleOpenFileSelector = () => {
    fileInputRef.current?.click();
  };

  /** DnD(드래그 앤 드롭) 완료 시 */
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(imageList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImageList(items);
    // 재정렬된 순서를 string[] 형태(URL)로 상위에 전달
    onChange?.(items.map((item) => item.url));
  };

  // 디자인용 클래스
  const colorStyle = {
    bgColor: "bg-background-200",
    borderColor: "border-[0.5px] border-transparent",
    hoverColor: "hover:border-grayscale-200 hover:bg-background-300",
    innerHoverColor: "hover:bg-background-300",
  };

  // 업로드 버튼
  const uploadButton = (
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
        ref={fileInputRef}
        type="file"
        name={name}
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
        multiple
      />
      <div className="pointer-events-none absolute top-0 z-10 p-7 lg:p-10">
        <HiUpload className="text-[24px] text-grayscale-400 lg:text-[36px]" />
      </div>
    </div>
  );

  // 이미지 미리보기 리스트
  const imageListContent = (
    <div className="flex gap-5 lg:gap-6">
      {imageList.map((image, index) => (
        <Draggable key={image.id} draggableId={image.id} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <PreviewItem image={image} handleDeleteImage={handleDeleteImage} placeholder={false} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );

  /** DnD 활성화 전까지는 그냥 렌더링 */
  if (!enabled) {
    return (
      <div className="flex gap-5 lg:gap-6">
        {uploadButton}
        {imageListContent}
      </div>
    );
  }

  // DnD 활성화된 상태
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-5 lg:gap-6">
        {uploadButton}
        <Droppable droppableId="image-list" direction="horizontal">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-5 lg:gap-6">
              {imageListContent}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
