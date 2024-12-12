import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* Lottie 애니메이션 */}
      <Player
        autoplay
        loop
        src="/loding.json" // public 폴더의 Lottie 파일
        className="mb-8 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
      />
      <p className="text-grayscale-700 mb-8 text-center text-lg">Loading...</p>
    </div>
  );
}
