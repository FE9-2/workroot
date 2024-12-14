"use client";

import React from "react";
import Image from "next/image";

interface CloseButtonProps {
  onClose: () => void;
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <button type="button" onClick={onClose} className="absolute right-2 top-1/2 -translate-y-1/2 transform md:right-4">
      <Image
        src="/icons/x/x-md.svg"
        alt="닫기"
        width={30}
        height={30}
        className="hidden cursor-pointer hover:opacity-70 sm:block"
      />
      <Image
        src="/icons/x/x-sm.svg"
        alt="닫기"
        width={20}
        height={20}
        className="block cursor-pointer hover:opacity-70 sm:hidden"
      />
    </button>
  );
}
