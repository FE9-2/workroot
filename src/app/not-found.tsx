"use client";
import Link from "next/link";
import { Player } from "@lottiefiles/react-lottie-player"; // Lottie Player import
import Button from "../app/components/button/default/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* Lottie 애니메이션 */}
      <Player
        autoplay
        loop
        src="/404.json" // JSON 파일 경로
        style={{ height: "300px", width: "300px" }} // 애니메이션 크기 설정
        className="mb-8"
      />

      {/* 에러 메시지 */}
      <div className="mb-8 px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">페이지가 존재하지 않습니다</h1>
        <p className="text-base text-gray-600">URL이 올바른지 확인해 보시거나, 아래 버튼을 눌러 이동해 주세요</p>
      </div>

      {/* 버튼 */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* 홈으로 버튼 */}
        <Link href="/" passHref>
          <Button variant="solid" width="sm" radius="full" className="bg-green-500 text-white hover:bg-green-600">
            홈으로
          </Button>
        </Link>

        {/* 뒤로 가기 버튼 */}
        <Button
          variant="solid"
          width="sm"
          radius="full"
          className="bg-gray-500 text-white hover:bg-gray-600"
          onClick={() => window.history.back()}
        >
          뒤로 가기
        </Button>
      </div>
    </div>
  );
}
