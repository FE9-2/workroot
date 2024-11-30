"use client";
import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { cn } from "@/lib/tailwindUtil";

interface BookmarkBtnProps {
  className?: string;
}

const BookmarkBtn = ({ className = "" }: BookmarkBtnProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  return (
    <button
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-orange-50 p-2 transition-colors",
        className
      )}
      onClick={toggleBookmark}
    >
      {isBookmarked ? (
        <FaBookmark className={cn("text-xl text-primary-orange-300")} />
      ) : (
        <FaRegBookmark className={cn("text-xl text-primary-orange-300")} />
      )}
    </button>
  );
};

export default BookmarkBtn;
