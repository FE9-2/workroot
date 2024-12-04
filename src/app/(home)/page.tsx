"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 클라이언트 환경에서만 IntersectionObserver 실행
    if (typeof window !== "undefined" && typeof IntersectionObserver !== "undefined") {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              const id = element.dataset.id ?? ""; // 기본값 설정
              if (id) {
                setVisibleSections((prev) => new Set(prev).add(id));
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      // 감시할 요소 선택 및 등록
      const targets = document.querySelectorAll("[data-id]");
      targets.forEach((target) => observer.current?.observe(target));

      return () => {
        // 컴포넌트 언마운트 시 감시 중단
        targets.forEach((target) => observer.current?.unobserve(target));
      };
    }
  }, []);

  const sections = [
    { id: "1", src: "/images/02.png", alt: "이미지 1" },
    { id: "2", src: "/images/03.png", alt: "이미지 2" },
    { id: "3", src: "/images/04.png", alt: "이미지 3" },
    { id: "4", src: "/images/05.png", alt: "이미지 4" },
  ];

  return (
    <div className="flex min-h-screen min-w-[320px] flex-col">
      <main className="flex-grow">
        {/* 히어로 섹션 */}
        <section className="bg-black text-black relative flex flex-col items-center py-10">
          <div className="relative z-0 w-full max-w-[320px] text-center sm:max-w-[80%] lg:max-w-[964px]">
            {/* 상자 내부의 텍스트와 버튼 */}
            <h1 className="font-nexon-bold mb-2 mt-6 text-2xl leading-tight text-green-500 sm:text-3xl md:text-4xl lg:text-5xl lg:leading-relaxed">
              WorkRoot
            </h1>
            <p className="font-nexon-regular mb-4 text-base leading-snug sm:text-lg md:text-xl lg:text-2xl lg:leading-relaxed">
              한 곳에서 관리하는 알바 구인 플랫폼
            </p>
            <Link href="/login">
              <p className="font-nexon-regular text-black inline-block rounded-lg bg-green-500 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg lg:px-10 lg:py-5 lg:text-xl">
                알바를 시작하기
              </p>
            </Link>
          </div>

          {/* 배경 이미지 */}
          <div className="relative mt-8 aspect-[964/520] w-[320px] sm:w-[70vw] lg:w-[964px]">
            <Image src="/images/01.png" alt="Hero Background" fill className="rounded-lg object-contain" priority />
          </div>
        </section>

        {/* UI 섹션 */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:gap-6 md:py-10 lg:gap-10 lg:py-20">
              {sections.map((section) => (
                <div
                  key={section.id}
                  data-id={section.id}
                  className={`relative flex h-[300px] w-full transform items-center justify-center rounded-lg opacity-0 transition-all duration-700 ease-in-out md:h-[400px] lg:h-[500px] ${
                    visibleSections.has(section.id) ? "scale-100 opacity-100" : "scale-90"
                  }`}
                >
                  <Image src={section.src} alt={section.alt} fill className="rounded-lg object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
