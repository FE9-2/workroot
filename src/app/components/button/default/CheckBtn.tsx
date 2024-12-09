"use client";
import React, { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/tailwindUtil";

interface CheckBtnProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // 체크박스의 레이블
  name: string; // 체크박스의 name 속성
  checked?: boolean; // 체크박스가 선택된 상태인지 여부
  disabled?: boolean; // 체크박스가 비활성화된 상태인지 여부
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CheckBtn = forwardRef<HTMLInputElement, CheckBtnProps>(
  ({ label, name, checked = false, disabled = false, onChange, className, ...props }, ref) => {
    return (
      <label
        htmlFor={name}
        className={cn(
          "flex items-center gap-[10px] rounded-lg text-sm",
          disabled ? "cursor-not-allowed text-grayscale-400" : "text-black cursor-pointer",
          className
        )}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {label}
      </label>
    );
  }
);
CheckBtn.displayName = "CheckBtn";
export default CheckBtn;
