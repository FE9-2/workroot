"use client";
import React, { ButtonHTMLAttributes } from "react";

interface FrameRadioBtnProps extends ButtonHTMLAttributes<HTMLInputElement> {
  label: string; // 라디오 버튼의 레이블을 추가
  name: string; // 라디오 버튼의 name 속성
  value: string; // 라디오 버튼의 value 속성
  checked?: boolean; // 라디오 버튼이 선택된 상태인지 여부
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: "sm" | "md"; // 버튼 너비
  disabled?: boolean; // 라디오 버튼이 비활성화된 상태인지 여부
}

const FrameRadioBtn: React.FC<FrameRadioBtnProps> = ({ width = "sm", checked = false, disabled = false, ...props }) => {
  const baseStyles = "flex items-center justify-between rounded-lg border px-5 py-4";

  const widths = {
    sm: "w-[252px]",
    md: "w-[360px]",
  };

  const bgColor = disabled ? "bg-gray-200" : checked ? "bg-primary-orange-50" : "bg-white";
  const borderColor = disabled ? "border-gray-200" : "border-primary-orange-300";
  const textColor = disabled ? "text-gray-400" : "text-black";
  const cursorStyle = disabled ? "cursor-not-allowed" : "cursor-pointer";

  return (
    <div className={`${baseStyles} ${widths[width]} ${bgColor} ${borderColor} ${cursorStyle}`}>
      <label htmlFor={props.value} className={`text-sm ${textColor}`}>
        {props.label}
      </label>
      <input
        type="radio"
        id={props.value}
        name={props.name}
        value={props.value}
        checked={checked}
        onChange={disabled ? undefined : props.onChange}
        disabled={disabled}
        className="radio-custom ml-2"
      />
    </div>
  );
};

export default FrameRadioBtn;
