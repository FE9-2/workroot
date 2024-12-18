"use client";

import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface ScrollTopButtonProps {
  showHeight?: number; // 버튼이 나타나는 스크롤 위치 (기본값: 200)
}

export default function ScrollTopButton({ showHeight = 200 }: ScrollTopButtonProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showHeight) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHeight]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-[8%] z-50 flex size-12 items-center justify-center rounded-full bg-primary-orange-300 text-white shadow-lg transition-all hover:bg-primary-orange-400 lg:size-14 ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"} transition-all duration-300`}
      aria-label="맨 위로 이동"
    >
      <IoIosArrowUp className="size-6 lg:size-7" />
    </button>
  );
}
