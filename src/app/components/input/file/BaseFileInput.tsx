"use client";

import { cn } from "@/lib/tailwindUtil";
import { BaseFileInputProps } from "@/types/textInput";
import { forwardRef } from "react";

const BaseFileInput = forwardRef<HTMLInputElement, BaseFileInputProps>((props, ref) => {
  /**
   * @param name: string;
   * @param variant: "upload" | "download";
   * @param size?: string;
   * @param file?: File | null;
   * @param onFileAction?: (file: File | null) => void;
   * @param icon?: React.ReactNode;
   * @param actionIcon?: React.ReactNode;
   * @param placeholder?: string;
   * @param accept?: string;
   */
  const colorStyle = {
    bgColor: "bg-background-200",
    borderColor: "border border-transparent",
    hoverColor: "hover:border-grayscale-200 hover:bg-background-300",
    focusColor: "[&:has(input:focus)]:border-primary-orange-300 caret-primary-orange-300",
    innerHoverColor: "hover:bg-background-300",
  };

  const defaultSize = "w-[327px] h-[54px] lg:w-[640px] lg:h-[64px]";
  const sizeStyles = props.size || defaultSize;

  const wrapperColorStyle = `${colorStyle.bgColor} ${colorStyle.borderColor} ${colorStyle.hoverColor} ${colorStyle.focusColor}`;
  const wrapperStyle = `relative flex gap-2 items-center justify-between rounded-lg border-[0.5px] p-[14px] lg:py-4 ${wrapperColorStyle} ${sizeStyles}`;

  const innerColorStyle = `${colorStyle.innerHoverColor}`;
  const fakeInputStyle = `text-grayscale-400 flex items-center border-none text-base leading-[26px] lg:text-xl lg:leading-[32px] ${innerColorStyle}`;
  const fileName =
    props.file && "!text-black-400 underline lg:text-xl font-normal lg:leading-8 text-base leading-[26px]";

  // 라벨 클릭 시 input 클릭 - 파일 선택 창 열기 / 파일 다운로드
  const handleFileSelect = () => {
    if (props.variant === "upload") {
      // ref가 함수인 경우와 객체인 경우 모두 처리
      if (typeof ref === "function") {
        // input 요소를 찾아서 클릭
        const fileInput = document.querySelector(`input[name="${props.name}"]`);
        if (fileInput) {
          (fileInput as HTMLInputElement).click();
        }
      } else if (ref && "current" in ref) {
        ref.current?.click();
      }
    }
    /**
     * @TODO 파일 다운로드 기능 추가
     */
  };

  return (
    <>
      <div className={wrapperStyle} onClick={handleFileSelect} role="button" tabIndex={0}>
        <span className={cn(fakeInputStyle, fileName)}>{props.file ? props.file.name : props.placeholder}</span>
        {props.variant === "upload" && (
          <input
            type="file"
            name={props.name}
            onChange={(e) => props.onFileAction?.(e.target.files?.[0] || null)}
            ref={ref}
            className="hidden"
            accept={props.accept}
          />
        )}
        {props.variant === "upload" && props.actionIcon}
        {props.variant === "download" && props.icon}
      </div>
    </>
  );
});

BaseFileInput.displayName = "BaseFileInput";

export default BaseFileInput;
