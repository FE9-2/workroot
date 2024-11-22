"use client";

import Link from "next/link";

import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {/* 히어로 섹션 */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl md:text-6xl">WorkRoot Project</h1>
            <p className="mb-8 text-xl md:text-2xl">Next.js와 함께하는 새로운 웹 경험</p>
            <div className="space-x-4">
              <Link
                href="/signup"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
              >
                시작하기
              </Link>
              <Link
                href="/login"
                className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                로그인
              </Link>
            </div>
            <div className="mt-8">
              <a
                href="https://github.com/cccwon2/fe9-advanced-project-template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border-2 border-white bg-transparent px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                GitHub에서 보기
                <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="p-6 text-center">
                <h3 className="mb-4 text-xl font-semibold">빠른 성능</h3>
                <p className="text-gray-600">Next.js의 서버 사이드 렌더링으로 최적화된 성능을 제공합니다.</p>
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-4 text-xl font-semibold">안전한 인증</h3>
                <p className="text-gray-600">보안이 강화된 인증 시스템으로 안전한 서비스를 이용하세요.</p>
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-4 text-xl font-semibold">반응형 디자인</h3>
                <p className="text-gray-600">모든 디바이스에서 최적화된 사용자 경험을 제공합니다.</p>
              </div>
            </div>
          </div>
        </section>
        <div className="space-y-4">
          <p className="font-nexon-light text-2xl text-gray-500">Nexon Lv1 Gothic Light</p>
          <p className="font-nexon-regular text-2xl text-gray-500">Nexon Lv1 Gothic Regular</p>
          <p className="font-nexon-bold text-2xl text-gray-500">Nexon Lv1 Gothic Bold</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
