"use client";

import { BaseFileInputProps } from "@/types/textInput";
import { useRef } from "react";

const BaseFileInput = (props: BaseFileInputProps) => {
  const colorStyle = {
    bgColor: "bg-background-200",
    borderColor: "border border-transparent",
    hoverColor: "hover:border-gray-200 hover:bg-background-300",
    focusColor: "[&:has(input:focus)]:border-primary-orange-300 caret-primary-orange-300",
    innerHoverColor: "hover:bg-background-300",
  };

  const defaultSize = "w-[327px] h-[54px] lg:w-[640px] lg:h-[64px]";
  const sizeStyles = props.size || defaultSize;

  const wrapperColorStyle = `${colorStyle.bgColor} ${colorStyle.borderColor} ${colorStyle.hoverColor} ${colorStyle.focusColor}`;
  const wrapperStyle = `relative flex gap-2 items-center justify-between rounded-lg border-[0.5px] p-[14px] lg:py-4 ${wrapperColorStyle} ${sizeStyles}`;

  const innerColorStyle = `${colorStyle.innerHoverColor}`;
  const fakeInputStyle = `text-gray-400 flex items-center border-none ${innerColorStyle}`;

  // 라벨 클릭 시 input 클릭 - 파일 선택 창 열기 / 파일 다운로드
  const inputRef = useRef<HTMLInputElement>(null);
  const handleWrapperClick = () => {
    if (props.variant === "upload") {
      inputRef.current?.click();
    } else {
      // 다운로드?
    }
  };

  return (
    <>
      <div className={wrapperStyle} onClick={props.variant === "upload" ? handleWrapperClick : undefined}>
        <label htmlFor={props.name} className={fakeInputStyle}>
          {props.file ? props.file.name : props.placeholder}
        </label>
        {props.variant === "upload" && (
          <input
            id={props.name}
            type="file"
            onChange={(e) => props.onFileAction?.(e.target.files?.[0] || null)}
            ref={inputRef}
            className="hidden"
          />
        )}
        {props.variant === "upload" && props.actionIcon}
        {props.variant === "download" && props.icon}
      </div>
    </>
  );
};

export default BaseFileInput;
