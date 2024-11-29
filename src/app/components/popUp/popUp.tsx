"use client";

import React from "react";
import Image from "next/image";
import CloseButton from "./closeButton";

interface PopupProps {
  viewers: number;
  onClose: () => void;
}

export default function Popup({ viewers, onClose }: PopupProps) {
  return (
    <div className="relative left-1/2 top-4 flex h-[48px] w-[327px] -translate-x-1/2 transform items-center rounded-lg bg-primary-blue-300 px-6 font-nexon text-gray-50 shadow-md md:h-[84px] md:w-[1165px] md:px-8">
      <div className="flex w-full items-center">
        <Image
          src="/icons/user/user-md.svg"
          alt="유저 아이콘"
          width={30}
          height={30}
          className="mr-3 hidden md:block"
        />
        <Image
          src="/icons/user/user-sm.svg"
          alt="유저 아이콘"
          width={20}
          height={20}
          className="mr-3 block md:hidden"
        />
        <p className="text-[12px] md:text-[18px]">
          현재 <strong className="text-primary-orange-300">{viewers}명</strong>이 알바폼을 보는 중이에요!
        </p>
      </div>
      <CloseButton onClose={onClose} />
    </div>
  );
}
