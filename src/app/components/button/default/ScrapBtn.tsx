"use client";
import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";
import axios from "axios";
import toast from "react-hot-toast";

interface ScrapBtnProps {
  className?: string;
  formId: number;
}

const ScrapBtn = ({ className = "", formId }: ScrapBtnProps) => {
  const [isScraped, setIsScraped] = useState(false);

  const toggleScrap = () => {
    setIsScraped((prev) => !prev);
  };

  const handleScrap = () => {
    toggleScrap();
    if (!isScraped) {
      // 스크랩
      try {
        axios.post(`/api/forms/${formId}/scrap`, { formId });
        toast.success("스크랩 되었습니다.");
      } catch (error) {
        toggleScrap();
      }
    }
    if (isScraped) {
      // 스크랩 취소
      try {
        axios.delete(`/api/forms/${formId}/scrap`);
        toast.success("스크랩이 취소되었습니다.");
      } catch (error) {
        toggleScrap();
      }
      return;
    }
  };
  console.log(isScraped);

  return (
    <button
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-orange-50 p-2 transition-colors",
        className
      )}
      onClick={handleScrap}
    >
      {isScraped ? (
        <FaBookmark className={cn("text-xl text-primary-orange-300")} />
      ) : (
        <FaRegBookmark className={cn("text-xl text-primary-orange-300")} />
      )}
    </button>
  );
};

export default ScrapBtn;
