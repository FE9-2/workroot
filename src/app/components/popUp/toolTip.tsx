"use client";

import React from "react";
import Image from "next/image";
import CloseButton from "./closeButton";

interface TooltipProps {
  onClose: () => void;
}

export default function Tooltip({ onClose }: TooltipProps) {
  return (
    <div className="relative left-4 flex h-[48px] w-[327px] items-center rounded-lg bg-primary-blue-300 pl-3 font-nexon text-gray-50 shadow-md md:h-[79px] md:w-[476px] md:pl-4">
      <div className="flex w-full items-center">
        <Image
          src="/icons/info/info-md.svg"
          alt="정보 아이콘"
          width={30}
          height={30}
          className="mr-2 hidden md:block"
        />
        <Image
          src="/icons/info/info-sm.svg"
          alt="정보 아이콘"
          width={20}
          height={20}
          className="mr-2 block md:hidden"
        />
        <p className="text-[12px] md:text-[18px]">알바폼 현재 진행상태를 변경할 수 있어요!</p>
      </div>
      <CloseButton onClose={onClose} />
    </div>
  );
}
