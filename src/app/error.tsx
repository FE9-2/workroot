"use client";

import React, { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player"; // Lottie 애니메이션 Player
import { handleError } from "../utils/handleError"; // 유틸리티 함수
import { getErrorMessage } from "../utils/getErrorMessage"; // 사용자 친화적 메시지
import { AuthenticationError } from "../types/error";
import Button from "../app/components/button/Button"; // 버튼 컴포넌트

interface GlobalErrorProps {
  error: Error; // 에러 객체 타입
  reset: () => void; // 상태 초기화 함수
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    handleError(error); // 콘솔에 로그 기록
  }, [error]);

  const isAuthError =
    error instanceof AuthenticationError || (error instanceof Error && error.message.includes("Authentication"));

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* Lottie 애니메이션 */}
      <Player
        autoplay
        loop
        src="/error.json" // public 폴더의 Lottie 파일
        className="mb-8 w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px]"
      />

      {/* 에러 메시지 */}
      <h1 className="mb-4 text-center text-3xl font-bold text-red-600">Something went wrong</h1>
      <p className="mb-8 text-center text-lg text-gray-700">{getErrorMessage(error)}</p>

      {/* 버튼 영역 */}
      <div className="flex gap-4">
        {isAuthError ? (
          <Button variant="solid" width="sm" radius="lg" onClick={() => (window.location.href = "/login")}>
            로그인하기
          </Button>
        ) : (
          <Button variant="solid" width="sm" radius="lg" onClick={reset}>
            다시 시도
          </Button>
        )}
      </div>
    </div>
  );
}
