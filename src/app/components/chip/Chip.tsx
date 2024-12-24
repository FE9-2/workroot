"use client";
import React from "react";
import { cn } from "@/lib/tailwindUtil";

interface ChipProps {
  label: string;
  variant?: "positive" | "negative";
  border?: boolean;
  icon?: React.ReactElement;
  textStyle?: string;
}
/**
 * @param label
 * @param variant : "positive" | "negative";
 * @param border : boolean
 * @param icon
 * @param textStyle - 추가 스타일
 */
const Chip: React.FC<ChipProps> = ({
  label = "Label",
  variant,
  border,
  icon,
  textStyle = "text-sm md:text-base font-bold",
}: ChipProps) => {
  const wrapperStyle = "rounded flex items-center justify-center m-1";
  const paddingStyle = icon
    ? "px-[8px] py-1 md:px-[12px] md:py-1 lg:px-[8px] lg:py-[6px]"
    : "px-2 py-1 md:px-2 lg:py-[6px] lg:px-2";
  const variantStyle =
    variant === "positive" ? "bg-primary-blue-60 text-primary-orange-300" : "bg-line-100 text-grayscale-200";
  const baseTextStyle =
    "text-xs leading-[18px] md:leading-[20px] lg:text-sm lg:leading-[22px] font-medium tracking-tighter whitespace-nowrap";
  const borderStyle = border ? "border border-primary-orange-100" : "";
  const iconStyle = "flex items-center justify-center";

  return (
    <div className={cn(wrapperStyle, paddingStyle, variantStyle, borderStyle)}>
      {icon && <span className={iconStyle}>{icon}</span>}
      <span className={cn(baseTextStyle, textStyle)}>{label}</span>
    </div>
  );
};

export default Chip;
