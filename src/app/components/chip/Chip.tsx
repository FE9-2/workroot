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
/*
 * @params label
 * @params variant : "positive" | "negative";
 * @params border : boolean
 * @params icon
 * @params textStyle - 추가 스타일
 */
const Chip: React.FC<ChipProps> = ({ label = "Label", variant, border, icon, textStyle = "" }: ChipProps) => {
  const wrapperStyle = "rounded flex items-center justify-center";
  const paddingStyle = icon
    ? "px-[10px] py-1 md:px-[14.5px] md:py-1 lg:px-[10px] lg:py-[6px]"
    : "px-2 py-1 md:px-[10px] lg:py-[6px] lg:px-3";
  const varioantStyle =
    variant === "positive" ? "bg-primary-orange-50 text-primary-orange-300" : "bg-line-100 text-gray-200";
  const baseTextStyle =
    "text-xs leading-[20px] md:text-sm md:leading-[24px] lg:text-base lg:leading-[26px] font-medium";
  const borderStyle = border ? "border border-primary-orange-100" : "";
  const iconStyle = "flex items-center justify-center mr-[6px] md:mr-[8px] lg:mr-[9px]";

  return (
    <div className={cn(wrapperStyle, paddingStyle, varioantStyle, borderStyle)}>
      {icon && <span className={iconStyle}>{icon}</span>}
      <span className={cn(baseTextStyle, textStyle)}>{label}</span>
    </div>
  );
};

export default Chip;
