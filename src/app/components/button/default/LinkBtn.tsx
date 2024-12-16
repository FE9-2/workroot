"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/tailwindUtil";

interface LinkBtnProps {
  href: string;
  className?: string;
  variant?: "solid" | "outlined";
  width?: "xs" | "sm" | "md" | "lg" | ResponsiveWidth;
  height?: "sm" | "md" | "lg" | ResponsiveHeight;
  radius?: "lg" | "full";
  color?: "orange" | "gray" | "lime";
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  fontSize?: "xs" | "sm" | "base" | "lg" | ResponsiveFontSize;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

// 반응형 width 타입 추가
type ResponsiveWidth = {
  mobile?: "xs" | "sm" | "md" | "lg";
  tablet?: "xs" | "sm" | "md" | "lg";
  desktop?: "xs" | "sm" | "md" | "lg";
};

// 반응형 폰트 사이즈 타입 추가
type ResponsiveFontSize = {
  mobile?: "xs" | "sm" | "base" | "lg";
  tablet?: "xs" | "sm" | "base" | "lg";
  desktop?: "xs" | "sm" | "base" | "lg";
};

// 반응형 height 타입 추가
type ResponsiveHeight = {
  mobile?: "sm" | "md" | "lg";
  tablet?: "sm" | "md" | "lg";
  desktop?: "sm" | "md" | "lg";
};

/**
 * 링크 버튼 컴포넌트
 * @param href - 이동할 경로
 * @param variant - 버튼 스타일 solid | outlined
 * @param width - 버튼 너비 xs | sm | md | lg
 * @param height - 버튼 높이 sm | md | lg
 * @param radius - 버튼 모서리 둥글기 lg | full
 * @param color - 버튼 색상 orange | gray | lime
 * @param disabled - 비활성화 여부
 * @param icon - 버튼 내 아이콘
 * @param children - 버튼 내용
 * @returns 링크 버튼 컴포넌트
 */
const LinkBtn = ({
  href,
  className = "",
  variant = "solid",
  width = "md",
  height = "md",
  radius = "lg",
  color = "orange",
  icon,
  disabled = false,
  children,
  fontSize = "base",
  onClick,
}: LinkBtnProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium h-12";

  const colorStyles = {
    orange: {
      solid:
        "bg-primary-orange-300 text-white hover:bg-primary-orange-200 focus:ring-1 focus:ring-primary-orange-200 focus:outline-none disabled:bg-grayscale-100 disabled:pointer-events-none",
      outlined:
        "border-2 border-primary-orange-300 text-primary-orange-300 hover:border-primary-orange-200 hover:text-primary-orange-200 focus:ring-1 focus:ring-primary-orange-200 focus:outline-none disabled:border-grayscale-100 disabled:text-grayscale-100 disabled:pointer-events-none disabled:hover:bg-transparent",
    },
    gray: {
      solid:
        "bg-grayscale-100 text-grayscale-900 hover:bg-grayscale-200 focus:ring-1 focus:ring-grayscale-200 focus:outline-none disabled:bg-grayscale-50 disabled:pointer-events-none",
      outlined:
        "border-2 border-grayscale-200 text-grayscale-900 hover:border-grayscale-300 hover:bg-grayscale-50 focus:ring-1 focus:ring-grayscale-200 focus:outline-none disabled:border-grayscale-100 disabled:text-grayscale-100 disabled:pointer-events-none disabled:hover:bg-transparent",
    },
    lime: {
      solid:
        "bg-lime-600 text-white hover:bg-lime-700 focus:ring-1 focus:ring-lime-500 focus:outline-none disabled:bg-lime-300 disabled:pointer-events-none",
      outlined:
        "border-2 border-lime-600 text-lime-600 hover:border-lime-700 hover:text-lime-700 focus:ring-1 focus:ring-lime-500 focus:outline-none disabled:border-lime-300 disabled:text-lime-300 disabled:pointer-events-none disabled:hover:bg-transparent",
    },
  };

  const widths = {
    xs: "w-[60px] md:w-[80px]",
    sm: "w-[80px] md:w-[100px]",
    md: "w-[100px] md:w-[120px]",
    lg: "w-[120px] md:w-[140px]",
  };

  const radiuses = {
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const fontSizes = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  const heights = {
    sm: "h-8 md:h-10",
    md: "h-10 md:h-12",
    lg: "h-12 md:h-14",
  };

  const getWidthClass = (width: LinkBtnProps["width"]) => {
    if (typeof width === "string") {
      return widths[width];
    }

    return cn(
      width?.mobile && widths[width.mobile],
      width?.tablet && `md:${widths[width.tablet]}`,
      width?.desktop && `lg:${widths[width.desktop]}`
    );
  };

  const getFontSizeClass = (fontSize: LinkBtnProps["fontSize"]) => {
    if (typeof fontSize === "string") {
      return fontSizes[fontSize];
    }

    return cn(
      fontSize?.mobile && fontSizes[fontSize.mobile],
      fontSize?.tablet && `md:${fontSizes[fontSize.tablet]}`,
      fontSize?.desktop && `lg:${fontSizes[fontSize.desktop]}`
    );
  };

  const getHeightClass = (height: LinkBtnProps["height"]) => {
    if (typeof height === "string") {
      return heights[height];
    }

    return cn(
      height?.mobile && heights[height.mobile],
      height?.tablet && `md:${heights[height.tablet]}`,
      height?.desktop && `lg:${heights[height.desktop]}`
    );
  };

  if (disabled) {
    return (
      <span
        className={cn(
          baseStyles,
          colorStyles[color][variant],
          getWidthClass(width),
          getHeightClass(height),
          getFontSizeClass(fontSize),
          radiuses[radius],
          className
        )}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        baseStyles,
        colorStyles[color][variant],
        getWidthClass(width),
        getHeightClass(height),
        getFontSizeClass(fontSize),
        radiuses[radius],
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </Link>
  );
};

export default LinkBtn;
