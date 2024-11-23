"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined";
  width?: "xs" | "sm" | "md" | "lg";
  radius?: "lg" | "full";
  icon?: ReactNode;
}

/**
 * 버튼 컴포넌트
 * @param variant - 버튼 스타일 solid | outlined
 * @param width - 버튼 너비 xs | sm | md | lg
 * @param radius - 버튼 모서리 둥글기 lg | full
 * @param disabled - 비활성화 여부
 * @param icon - 버튼 내 아이콘
 * @param children - 버튼 내용
 * @param props - 추가 버튼 속성
 * @returns 버튼 컴포넌트
 */
const Button = ({
  className = "",
  variant = "solid",
  width = "md",
  radius = "lg",
  icon,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium h-12";

  const variants = {
    solid: [
      "bg-primary-orange-300 text-gray-100",
      "hover:bg-primary-orange-200",
      "focus:ring-1 focus:ring-primary-orange-200 focus:outline-none",
      "disabled:bg-gray-100 disabled:cursor-not-allowed text-white",
    ].join(" "),
    outlined: [
      "border-2 border-primary-orange-300 text-primary-orange-300",
      "hover:border-primary-orange-200 hover:text-primary-orange-200",
      "focus:ring-1 focus:ring-primary-orange-200 focus:outline-none",
      "disabled:border-gray-100 disabled:text-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    ].join(" "),
  };

  const widths = {
    xs: "w-[80px]",
    sm: "w-[180px]",
    md: "w-[327px]",
    lg: "w-[640px]",
  };

  const radiuses = {
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widths[width]} ${radiuses[radius]} ${className}`.trim()}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>} {/* 아이콘 렌더링 */}
      {children}
    </button>
  );
};

export default Button;
