"use client";
import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface BookmarkBtnProps {
  className?: string;
}

const BookmarkBtn: React.FC<BookmarkBtnProps> = ({ className = "" }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
  };

  const baseStyles =
    "inline-flex items-center justify-center transition-colors rounded-full h-12 w-12 p-2 bg-orange-50";

  const iconStyles = "text-xl text-primary-orange-300";

  return (
    <button className={`${baseStyles} ${className}`} onClick={toggleBookmark}>
      {isBookmarked ? <FaBookmark className={iconStyles} /> : <FaRegBookmark className={iconStyles} />}
    </button>
  );
};

export default BookmarkBtn;
