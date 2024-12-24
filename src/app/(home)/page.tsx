"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";
import TypewriterText from "../components/animation/TypewriterText";
import { IoIosArrowDown } from "react-icons/io";

const slides = [
  {
    id: 1,
    title: "쉽고 빨라요",
    content: "1분만에 알바폼을 만들어 보세요!\n링크를 복사하여 어디서든지 사용하세요.",
    image: "/images/land/s2.svg",
  },
  {
    id: 2,
    title: "한 곳에서 쉽게 관리하세요",
    content: "워크폼 관리 페이지에서 지원 현황을 확인하고\n지원자별 상태를 관리할 수 있습니다.",
    image: "/images/land/s3.png",
  },
  {
    id: 3,
    title: "쉽고 빠르게 지원하세요",
    content: "간단한 정보만 입력해도\n알바 지원이 가능합니다.",
    image: "/images/land/s4.png",
  },
  {
    id: 4,
    title: "workroot에 가입하세요",
    content: "오늘의 선택이 내일의 열매가 됩니다.",
    image: "/images/land/step1.png",
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

// 배경 그라데이션 애니메이션 추가
const backgroundVariants = {
  initial: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
  },
  animate: {
    background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 2,
      touchMultiplier: 2,
      infinite: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let lastScrollTime = 0;
    const scrollThreshold = 150;

    lenisRef.current.on("scroll", ({ progress }: { progress: number }) => {
      const currentTime = Date.now();
      if (currentTime - lastScrollTime < scrollThreshold) return;

      if (!isScrollingRef.current) {
        const totalSlides = slides.length;
        const progressPerSlide = 1 / (totalSlides - 1);
        const currentProgress = progress / progressPerSlide;
        let newSlideIndex = Math.round(currentProgress);

        if (progress >= 0.99) {
          newSlideIndex = 0;
          setTimeout(() => {
            lenisRef.current?.scrollTo(0, {
              duration: 1.2,
              easing: (t) => t * (2 - t),
            });
          }, 100);
        }

        if (newSlideIndex !== currentSlide) {
          setCurrentSlide(newSlideIndex);
          isScrollingRef.current = true;

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 200);
        }
      }
      lastScrollTime = currentTime;
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
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          ref={containerRef}
          className={`relative h-[400vh] min-h-[768px] overflow-hidden ${isLargeScreen ? "" : "flex flex-col"}`}
        >
          <div className="to-black/30 absolute inset-0 bg-gradient-to-b from-transparent" />

          <motion.div
            className={`fixed inset-0 ${isLargeScreen ? "flex" : "flex flex-col"}`}
            style={{
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            {/* 내용 섹션에 새로운 스타일 적용 */}
            <motion.div
              className={`relative ${
                isLargeScreen ? "w-1/2" : "flex h-1/2 w-full items-center justify-center overflow-hidden"
              }`}
              animate={{
                width: currentSlide === 0 ? "100%" : isLargeScreen ? "50%" : "100%",
                height: currentSlide === 0 ? "100%" : isLargeScreen ? "100%" : "50%",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* 이미지 컨테이너에 새로운 효과 추가 */}
              <motion.div
                className="relative flex h-full w-full items-center justify-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {currentSlide === 0 ? (
                  <Image
                    src="/brand.png"
                    alt="Brand Logo"
                    width={800}
                    height={800}
                    className="h-full max-h-[800px] w-full max-w-[800px] object-contain"
                    priority
                  />
                ) : currentSlide === 4 || currentSlide === 5 ? (
                  <motion.div
                    key={currentSlide}
                    className="relative z-40 flex h-full w-full flex-col items-center justify-center p-4 pb-6 pt-4 max-[640px]:px-12 max-[640px]:py-3 md:p-6 md:pb-8 md:pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    <motion.h2
                      className="mb-2 mt-0 text-center text-xl font-semibold text-gray-100 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] max-[640px]:mb-1 max-[640px]:px-4 md:mb-4 md:mt-0 md:text-3xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {slides[currentSlide].blackAreaTitle}
                    </motion.h2>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
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
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </motion.div>
                    <motion.p
                      className="mb-0 max-w-[600px] whitespace-pre-wrap text-center text-sm text-gray-200 max-[640px]:mt-1 max-[640px]:px-4 md:text-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <TypewriterText text={slides[currentSlide].blackAreaContent || ""} />
                    </motion.p>
                  </motion.div>
                ) : (
                  <motion.div
                    className="relative h-full max-h-[600px] w-full max-w-[600px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Image
                      src="/brand.png"
                      alt="Brand Logo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 600px) 100vw, 600px"
                      priority
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* 스크롤 인디케이터 개선 */}
              {currentSlide === 0 && (
                <motion.div
                  className="absolute bottom-8 left-0 right-0 flex flex-col items-center"
                  animate={bounceAnimation}
                >
                  <div className="flex flex-col items-center rounded-full bg-white/10 p-3 backdrop-blur-sm">
                    <IoIosArrowDown className="text-2xl text-[#71db77]" />
                    <span className="mt-1 text-xs font-semibold text-[#71db77]">scroll</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* 콘텐츠 섹션에 새로운 디자인 요소 추가 */}
            <AnimatePresence mode="wait">
              {currentSlide > 0 && (
                <motion.div
                  className={`relative z-40 flex ${isLargeScreen ? "w-1/2" : "h-1/2 w-full"}`}
                  style={{
                    background: "linear-gradient(135deg, #71db77 0%, #56c45d 100%)",
                    boxShadow: "0 0 30px rgba(113, 219, 119, 0.3)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isLargeScreen ? "50%" : "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
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
                          className="relative w-full overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                          style={{ paddingBottom: "56.25%" }}
                        >
                          <Image
                            src={slides[currentSlide].image || ""}
                            alt={slides[currentSlide].title || ""}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, 600px"
                            className="transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </motion.div>
                      <motion.p
                        className="mb-0 max-w-[600px] whitespace-pre-wrap text-center text-sm text-[#1a1a1a] max-[640px]:mt-1 max-[640px]:px-4 md:text-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                      >
                        <TypewriterText text={slides[currentSlide].content} />
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 네비게이션 도트 개선 */}
          {currentSlide > 0 && (
            <motion.div
              className={`fixed ${
                isLargeScreen
                  ? "right-8 top-1/2 -translate-y-1/2 space-y-3"
                  : "bottom-8 left-1/2 flex -translate-x-1/2 space-x-3"
              }`}
            >
              {slides.slice(1).map((_, index) => (
                <motion.div key={index + 1} className="group relative h-3 w-3" whileHover={{ scale: 1.2 }}>
                  <motion.div className="absolute -inset-2 rounded-full bg-white/10 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100" />
                  <motion.div
                    className="h-full w-full cursor-pointer rounded-full border-2 border-white/50"
                    animate={{
                      backgroundColor: index + 1 === currentSlide ? "#108b2d" : "transparent",
                      scale: index + 1 === currentSlide ? 1.2 : 1,
                    }}
                    onClick={() => {
                      /* ... (기존 클릭 핸들러) */
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
