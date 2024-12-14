"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function SearchSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <Player
        autoplay
        loop
        src="/search.json"
        className="mb-8 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
      />
      <div className="flex flex-col justify-center gap-4">
        <div className="text-center text-base font-semibold text-primary-orange-400 lg:text-lg">검색 중 입니다</div>
        <div className="text-center text-sm font-normal text-primary-orange-400 lg:text-base">
          잠시만 기다려주세요...
        </div>
      </div>
    </div>
  );
}
