"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

const slides = [
  { id: 1, image: "/brand.png", title: "Brand Image" },
  {
    id: 2,
    title: "어디서든 지원받으세요",
    content: "다양한 사이트, SNS, 문자까지\n언제 어디서든 직원을 구해보세요.",
    image: "/images/land/s1.jpg",
  },
  {
    id: 3,
    title: "쉽고 빨라요",
    content: "1분만에 워크폼을 만들어 보세요!\n링크를 복사하여 어디서든지 사용하세요.",
    image: "/images/land/s2.jpg",
  },
  {
    id: 4,
    title: "한 곳에서 쉽게 관리하세요",
    content: "워크크폼 관리 페이지에서 지원 현황을 확인하고\n지원자별 상태를 관리할 수 있습니다.",
    image: "/images/land/s3.jpg",
  },
  {
    id: 5,
    title: "쉽고 빠르게 지원하세요",
    content: "간단한 정보만 입력해도\n알바 지원이 가능합니다.",
    image: "/images/land/s4.jpg",
  },
  {
    id: 6,
    title: "실시간 알림 기능",
    content: "새로운 지원자가 있을 때마다 실시간으로 알림을 받아보세요",
    image: "/images/land/5.webp",
    blackAreaTitle: "실시간 알림 기능",
    blackAreaContent: "새로운 지원자가 있을 때마다 실시간으로 알림을 받아보세요",
    blackAreaImage: "/images/land/black-area-5.webp", // 검은 영역용 이미지 추가
  },
  {
    id: 7,
    title: "데이터 분석 및 리포트",
    content: "지원자 통계와 채용 프로세스 분석을 통해 더 나은 의사결정을 내리세요",
    image: "/images/land/6.webp",
    blackAreaTitle: "데이터 분석 및 리포트",
    blackAreaContent: "지원자 통계와 채용 프로세스 분석을 통해 더 나은 의사결정을 내리세요",
    blackAreaImage: "/images/land/black-area-6.webp", // 검은 영역용 이미지 추가
  },
];

const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    repeat: Infinity,
    duration: 1.5,
    ease: "easeInOut",
  },
};

export default function LandingPage() {
  const isLargeScreen = useMediaQuery({ minWidth: 641 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setIsLoaded(true);
    lenisRef.current = new Lenis({
      duration: 0.8, // 1.2에서 0.8로 변경
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 2,
      touchMultiplier: 1.2,
      infinite: false,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let lastScrollTime = 0;
    const scrollThreshold = 500; // ms

    lenisRef.current.on("scroll", ({ progress }: { progress: number }) => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollThreshold) return;

      if (!isScrollingRef.current) {
        const totalSlides = slides.length;
        const newSlideIndex = Math.min(slides.length - 1, Math.max(0, Math.round(progress * (totalSlides - 1))));

        if (newSlideIndex !== currentSlide) {
          setCurrentSlide(newSlideIndex);
          isScrollingRef.current = true;
          const targetScroll =
            (newSlideIndex / (totalSlides - 1)) *
            (isLargeScreen ? containerRef.current!.scrollHeight : containerRef.current!.scrollWidth);

          lenisRef.current?.scrollTo(targetScroll, {
            immediate: false,
            duration: 600, // 800에서 600으로 변경
            easing: (t: number) => t * (2 - t),
          });

          lastScrollTime = currentTime;

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 600); // 800에서 600으로 변경
        }
      }
    });

    document.documentElement.style.scrollbarWidth = "none";
    document.documentElement.style.overflow = "auto";
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        display: none;
      }
      body {
        -ms-overflow-style: none;
      }
    `;
    document.head.append(style);

    return () => {
      lenisRef.current?.destroy();
      document.documentElement.style.overflow = "";
      style.remove();
    };
  }, [currentSlide, isLargeScreen]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          ref={containerRef}
          className={`h-[400vh] min-h-[768px] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] ${
            isLargeScreen ? "" : "flex flex-col"
          }`}
        >
          <div className={`fixed inset-0 ${isLargeScreen ? "flex" : "flex flex-col"}`}>
            <motion.div
              className={`relative ${isLargeScreen ? "w-1/2" : "flex h-1/2 w-full items-center justify-center overflow-hidden"}`}
              animate={{
                width: currentSlide === 0 ? "100%" : isLargeScreen ? "50%" : "100%",
                height: currentSlide === 0 ? "100%" : isLargeScreen ? "100%" : "50%",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  opacity: { duration: 1, ease: "easeInOut" },
                }}
              >
                {currentSlide === 5 || currentSlide === 6 ? (
                  <motion.div
                    key={currentSlide}
                    className="relative z-40 flex h-full w-full flex-col items-center justify-center p-4 pb-6 pt-4 max-[640px]:px-12 max-[640px]:py-3 md:p-6 md:pb-8 md:pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  >
                    <motion.h2
                      className="mb-2 mt-0 text-center text-xl font-semibold text-gray-100 max-[640px]:mb-1 max-[640px]:px-4 md:mb-4 md:mt-0 md:text-3xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {slides[currentSlide].blackAreaTitle}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="mb-2 w-full max-w-[600px] max-[640px]:max-w-[75%] max-[640px]:px-4 md:mb-4"
                      style={{ maxHeight: "calc(100% - 12rem)" }}
                    >
                      <div
                        className="relative w-full overflow-hidden rounded-lg shadow-lg"
                        style={{ paddingBottom: "56.25%" }}
                      >
                        <Image
                          src={slides[currentSlide].blackAreaImage || ""}
                          alt={slides[currentSlide].blackAreaTitle || ""}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 600px"
                        />
                      </div>
                    </motion.div>
                    <motion.p
                      className="mb-0 max-w-[600px] whitespace-pre-wrap text-center text-sm text-gray-200 max-[640px]:mt-1 max-[640px]:px-4 md:text-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {slides[currentSlide].blackAreaContent}
                    </motion.p>
                  </motion.div>
                ) : (
                  <Image
                    src="/brand.png"
                    alt="Brand Logo"
                    width={800}
                    height={800}
                    className="h-full max-h-[800px] w-full max-w-[800px] object-contain"
                  />
                )}
              </motion.div>
              {currentSlide === 0 && (
                <motion.div
                  className="absolute bottom-8 left-0 right-0 flex flex-col items-center"
                  animate={bounceAnimation}
                >
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 2L30 28L58 2"
                      stroke="#71db77"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mt-1 text-2xl font-semibold text-[#71db77]">scroll</span>
                </motion.div>
              )}
            </motion.div>
            <AnimatePresence mode="wait">
              {currentSlide > 0 && (
                <motion.div
                  key={currentSlide}
                  className={`relative z-40 flex ${
                    isLargeScreen ? "w-1/2" : "h-1/2 w-full"
                  } flex-col items-center justify-center p-4 pb-6 pt-4 max-[640px]:px-12 max-[640px]:py-3 md:p-6 md:pb-8 md:pt-6`}
                  style={{
                    background: "linear-gradient(135deg, #71db77 0%, #56c45d 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: isLargeScreen ? "100%" : "50%",
                  }}
                  initial={{ opacity: 0, [isLargeScreen ? "y" : "x"]: isLargeScreen ? "100%" : "100%" }}
                  animate={{ opacity: 1, [isLargeScreen ? "y" : "x"]: 0 }}
                  exit={{ opacity: 0, [isLargeScreen ? "y" : "x"]: isLargeScreen ? "-100%" : "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.h2
                    className="mb-2 mt-0 text-center text-xl font-semibold text-gray-100 max-[640px]:mb-1 max-[640px]:px-4 md:mb-4 md:mt-0 md:text-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {slides[currentSlide].title}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-2 w-full max-w-[600px] max-[640px]:max-w-[75%] max-[640px]:px-4 md:mb-4"
                    style={{ maxHeight: "calc(100% - 12rem)" }}
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-lg shadow-lg"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      <Image
                        src={slides[currentSlide].image || ""}
                        alt={slides[currentSlide].title || ""}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                  </motion.div>
                  <motion.p
                    className="mb-0 max-w-[600px] whitespace-pre-wrap text-center text-sm text-gray-200 max-[640px]:mt-1 max-[640px]:px-4 md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {slides[currentSlide].content}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {currentSlide > 0 && (
            <div
              className={`fixed ${isLargeScreen ? "right-4 top-1/2 -translate-y-1/2 space-y-2" : "bottom-4 left-1/2 flex -translate-x-1/2 space-x-2"}`}
            >
              {slides.slice(1).map((_, index) => (
                <div
                  key={index + 1}
                  className={`h-4 w-4 rounded-full ${index + 1 === currentSlide ? "bg-[#108b2d]" : "bg-[#f8fff8]"}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
