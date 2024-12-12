"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <Player
        autoplay
        loop
        src="/loding.json"
        className="mb-8 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
      />
    </div>
  );
}
