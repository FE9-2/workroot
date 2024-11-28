"use client";
import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/tailwindUtil";

interface CheckBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // 체크박스의 레이블
  name: string; // 체크박스의 name 속성
  value: string; // 체크박스의 value 속성
  checked?: boolean; // 체크박스가 선택된 상태인지 여부
  disabled?: boolean; // 체크박스가 비활성화된 상태인지 여부
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBtn: React.FC<CheckBtnProps> = ({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-lg p-2",
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <label htmlFor={value} className={cn("text-sm", disabled ? "text-gray-400" : "text-black")}>
        {label}
      </label>
      <input
        type="checkbox"
        id={value}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="ml-2"
        {...props}
      />
    </div>
  );
};

export default CheckBtn;
