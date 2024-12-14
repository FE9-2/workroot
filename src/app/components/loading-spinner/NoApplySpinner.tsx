"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function NoApplySpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <Player
        autoplay
        loop
        src="/search.json"
        className="mb-8 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
      />
      <div className="flex flex-col justify-center gap-4">
        <div className="text-center text-base font-semibold text-primary-orange-400 lg:text-lg"></div>
      </div>
    </div>
  );
}
