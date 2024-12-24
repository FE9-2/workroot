"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";

const slides = [
  {
    id: 1,
    title: "쉽고 빨라요",
    content: "1분만에 알바폼을 만들어 보세요!\n링크를 복사하여 어디서든지 사용하세요.",
    image: "/images/land/s2.jpg",
  },
  {
    id: 2,
    title: "한 곳에서 쉽게 관리하세요",
    content: "워크폼 관리 페이지에서 지원 현황을 확인하고\n지원자별 상태를 관리할 수 있습니다.",
    image: "/images/land/s3.jpg",
  },
  {
    id: 3,
    title: "쉽고 빠르게 지원하세요",
    content: "간단한 정보만 입력해도\n알바 지원이 가능합니다.",
    image: "/images/land/s4.jpg",
  },
  {
    id: 4,
    title: "workroot에 가입하세요",
    content: "오늘의 선택이 내일의 열매가 됩니다.",
    image: "/images/land/step1.jpg",
  },
  {
    id: 5,
    title: "지원자 이용 방법",
    content: "언제든 다시 볼 수 있게\n공고를 스크랩하세요",
    image: "/images/land/step2-2.jpg",
    blackAreaTitle: "사장님 이용 방법",
    blackAreaContent: "워크채널 우측의 [폼 만들기] 버튼을 클릭하고\n인재 채용을 시작하세요",
    blackAreaImage: "/images/land/step2-1.jpg",
  },
  {
    id: 6,
    title: "",
    content: "마이페이지에서 스크랩한 공고를 분석하고\n지원 계획을 세우세요",
    image: "/images/land/step3-2.jpg",
    blackAreaTitle: "",
    blackAreaContent: "내 워크폼에서 작성한 공고를\n손쉽게 수정하고 삭제할 수 있어요",
    blackAreaImage: "/images/land/step3-1.jpg",
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
      duration: 0.8, // 1.2에�� 0.8로 변경
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
                  duration: 0.8, // Updated transition duration
                  ease: "easeInOut",
                }}
              >
                {currentSlide === 0 ? (
                  <Image
                    src="/brand.png"
                    alt="Brand Logo"
                    width={800}
                    height={800}
                    className="h-full max-h-[800px] w-full max-w-[800px] object-contain"
                  />
                ) : currentSlide === 4 || currentSlide === 5 ? (
                  <motion.div
                    key={currentSlide}
                    className="relative z-40 flex h-full w-full flex-col items-center justify-center p-4 pb-6 pt-4 max-[640px]:px-12 max-[640px]:py-3 md:p-6 md:pb-8 md:pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }} // Update 1
                  >
                    <motion.h2
                      className="mb-2 mt-0 text-center text-xl font-semibold text-gray-100 max-[640px]:mb-1 max-[640px]:px-4 md:mb-4 md:mt-0 md:text-3xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }} // Update 2
                    >
                      {slides[currentSlide].blackAreaTitle}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }} // Update 2
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
                      transition={{ delay: 0.5, duration: 0.6 }} // Update 2
                    >
                      {slides[currentSlide].blackAreaContent}
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }} // Update 3
                  >
                    <div className="relative h-full max-h-[600px] w-full max-w-[600px]">
                      <Image
                        src="/brand.png"
                        alt="Brand Logo"
                        fill
                        className="object-contain"
                        sizes="(max-width: 600px) 100vw, 600px"
                      />
                    </div>
                  </motion.div>
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
                  className={`relative z-40 flex ${isLargeScreen ? "w-1/2" : "h-1/2 w-full"}`}
                  style={{
                    background: "linear-gradient(135deg, #71db77 0%, #56c45d 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: isLargeScreen ? "100%" : "50%",
                    overflow: "hidden",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      className="flex h-full w-full flex-col items-center justify-center p-4 pb-6 pt-4 max-[640px]:px-12 max-[640px]:py-3 md:p-6 md:pb-8 md:pt-6"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <motion.h2
                        className="mb-2 mt-0 text-center text-xl font-semibold text-[#1a1a1a] max-[640px]:mb-1 max-[640px]:px-4 md:mb-4 md:mt-0 md:text-3xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05, duration: 0.3 }}
                      >
                        {slides[currentSlide].title}
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
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
                        className="mb-0 max-w-[600px] whitespace-pre-wrap text-center text-sm text-[#1a1a1a] max-[640px]:mt-1 max-[640px]:px-4 md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                      >
                        {slides[currentSlide].content}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
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
