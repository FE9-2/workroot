"use client";
import React, { useState, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/tailwindUtil";
import { IoShareSocialSharp } from "react-icons/io5"; // 기본 공유 아이콘
import { FaLink } from "react-icons/fa"; // 링크 및 카카오톡 아이콘
import { FcShare } from "react-icons/fc";
import shareToKakao from "@/utils/shareToKakao";
import toast from "react-hot-toast";
import Image from "next/image";

interface ExpandedFloatingBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "white";
  icon?: ReactNode;
}

const ExpandedFloatingBtn = ({ variant = "orange", className, ...props }: ExpandedFloatingBtnProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium rounded-full";
  const expandedStyles = "h-32 px-1 bg-primary-orange-200  hover:bg-primary-orange-100";
  const collapsedStyles = "h-12 w-full";

  const variants = {
    orange: "bg-primary-orange-300 text-white hover:bg-primary-orange-200",
    white: "bg-white text-primary-orange-300 border border-primary-orange-300 hover:bg-primary-grayscale-100",
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("링크가 복사되었습니다.");
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], isExpanded ? expandedStyles : collapsedStyles, className)}
      onClick={handleToggle}
      {...props}
    >
      {isExpanded ? (
        // 확장된 상태일 때 카카오톡 및 링크 아이콘 표시
        <div className="flex flex-col">
          <button onClick={() => shareToKakao()} className="flex items-center">
            <div>
              <Image
                src="/icons/social/social_kakao.png"
                layout="fixed"
                width={50}
                height={50}
                objectFit="cover"
                alt="카카오톡"
              />
            </div>
          </button>
          <button onClick={handleLinkCopy} className="mt-2 flex items-center">
            <div className="rounded-full bg-blue-50 p-3 text-2xl">
              <FcShare />
            </div>
          </button>
        </div>
      ) : (
        // 기본 상태일 때 공유 아이콘 표시
        <IoShareSocialSharp className="text-2xl" />
      )}
    </button>
  );
};

export default ExpandedFloatingBtn;
