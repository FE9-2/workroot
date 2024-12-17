"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/tailwindUtil";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined";
  width?: "xs" | "sm" | "md" | "lg";
  height?: "sm" | "md" | "lg";
  radius?: "lg" | "full";
  color?: "orange" | "gray" | "lime";
  icon?: ReactNode;
}
/**
 * 버튼 컴포넌트
 * @param variant - 버튼 스타일 solid | outlined
 * @param width - 버튼 너비 xs | sm | md | lg
 * @param height - 버튼 높이 sm | md | lg
 * @param radius - 버튼 모서리 둥글기 lg | full
 * @param color - 버튼 색상 orange | gray
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
  height = "md",
  radius = "lg",
  color = "orange",
  icon,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium h-12";

  const colorStyles = {
    orange: {
      solid:
        "bg-primary-orange-300 text-white hover:bg-primary-orange-200 focus:ring-1 focus:ring-primary-orange-200 focus:outline-none disabled:bg-grayscale-100 disabled:cursor-not-allowed",
      outlined:
        "border-2 border-primary-orange-300 text-primary-orange-300 hover:border-primary-orange-200 hover:text-primary-orange-200 focus:ring-1 focus:ring-primary-orange-200 focus:outline-none disabled:border-grayscale-100 disabled:text-grayscale-100 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    },
    gray: {
      solid:
        "bg-grayscale-100 text-grayscale-900 hover:bg-grayscale-200 focus:ring-1 focus:ring-grayscale-200 focus:outline-none disabled:bg-grayscale-50 disabled:cursor-not-allowed",
      outlined:
        "border-2 border-grayscale-200 text-grayscale-900 hover:border-grayscale-300 hover:bg-grayscale-50 focus:ring-1 focus:ring-grayscale-200 focus:outline-none disabled:border-grayscale-100 disabled:text-grayscale-100 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    },
    lime: {
      solid:
        "bg-lime-600 text-white hover:bg-lime-700 focus:ring-1 focus:ring-lime-500 focus:outline-none disabled:bg-lime-300 disabled:cursor-not-allowed",
      outlined:
        "border-2 border-lime-600 text-lime-600 hover:border-lime-700 hover:text-lime-700 focus:ring-1 focus:ring-lime-500 focus:outline-none disabled:border-lime-300 disabled:text-lime-300 disabled:cursor-not-allowed disabled:hover:bg-transparent",
    },
  };

  const widths = {
    xs: "w-[60px] md:w-[80px]",
    sm: "w-[120px] md:w-[140px]",
    md: "w-[240px] lg:w-[327px]",
    lg: "w-[480px] xl:w-[640px]",
  };

  const radiuses = {
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const heights = {
    sm: "h-8 md:h-10",
    md: "h-10 md:h-12",
    lg: "h-12 md:h-14",
  };

  return (
    <button
      className={cn(
        baseStyles,
        colorStyles[color][variant],
        widths[width],
        heights[height],
        radiuses[radius],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
