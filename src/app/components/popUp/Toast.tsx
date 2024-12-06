"use client";

import React from "react";
import Image from "next/image";
import CloseButton from "./closeButton";

interface ToastProps {
  onClose: () => void;
}

export default function Toast({ onClose }: ToastProps) {
  return (
    <div className="text-grayscale-50 relative left-1/2 top-4 flex h-[48px] w-[327px] -translate-x-1/2 transform items-center rounded-lg bg-primary-blue-300 px-4 font-nexon shadow-md md:h-[64px] md:w-[640px]">
      <div className="flex w-full items-center justify-start md:justify-center">
        <Image
          src="/icons/check/check-circle-md.svg"
          alt="체크 아이콘"
          width={30}
          height={30}
          className="mr-2 hidden md:block"
        />
        <Image
          src="/icons/check/check-circle-sm.svg"
          alt="체크 아이콘"
          width={20}
          height={20}
          className="mr-2 block md:hidden"
        />
        <p className="text-[12px] md:text-[18px]">정보가 수정되었습니다.</p>
      </div>
      <CloseButton onClose={onClose} />
    </div>
  );
}
