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
    image: "/images/land/step2-2.png",
    blackAreaTitle: "사장님 이용 방법",
    blackAreaContent: "워크채널 우측의 [폼 만들기] 버튼을 클릭하고\n인재 채용을 시작하세요",
    blackAreaImage: "/images/land/step2-1.png",
  },
  {
    id: 6,
    title: "",
    content: "마이페이지에서 스크랩한 공고를 분석하고\n지원 계획을 세우세요",
    image: "/images/land/step3-2.png",
    blackAreaTitle: "",
    blackAreaContent: "내 워크폼에서 작성한 공고를\n손쉽게 수정하고 삭제할 수 있어요",
    blackAreaImage: "/images/land/step3-1.png",
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
          ref={containerRef}
          className="relative h-[400vh] min-h-[768px] overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        >
          <motion.div
            className={`fixed inset-0 ${isLargeScreen ? "flex" : "flex flex-col"}`}
            style={{
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Hero Section */}
            <motion.div
              className={`relative ${isLargeScreen ? "w-1/2" : "h-1/2 w-full"}`}
              animate={{
                width: currentSlide === 0 ? "100%" : isLargeScreen ? "50%" : "100%",
                height: currentSlide === 0 ? "100%" : isLargeScreen ? "100%" : "50%",
              }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="relative flex h-full w-full items-center justify-center overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {currentSlide === 0 ? (
                  <div className="flex flex-col items-center justify-center space-y-12 p-8">
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="md:h-400 md:w-400 h-200 w-200 relative"
                    >
                      <Image src="/brand.png" alt="Brand Logo" className="" priority width={800} height={800} />
                    </motion.div>
                  </div>
                ) : (
                  <motion.div
                    key={currentSlide}
                    className="relative h-full w-full p-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3c72] to-[#2a5298] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                      <Image
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        fill
                        className="object-contain p-6 transition-all duration-700 ease-out hover:scale-105 hover:brightness-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* 스크롤 인디케이터 개선 */}
              {currentSlide === 0 && (
                <motion.div
                  className="absolute bottom-5 left-0 right-0 flex flex-col items-center"
                  animate={bounceAnimation}
                >
                  <div className="flex flex-col items-center space-y-1 rounded-full p-5 backdrop-blur-lg transition-all duration-300 hover:bg-white/10">
                    <IoIosArrowDown className="text-4xl text-primary-orange-300" />
                    <span className="text-sm font-medium tracking-wide text-primary-orange-300">scroll</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Content Section */}
            <AnimatePresence mode="wait">
              {currentSlide > 0 && (
                <motion.div
                  className={`relative z-40 flex ${isLargeScreen ? "w-1/2" : "h-1/2 w-full"}`}
                  style={{
                    background: "linear-gradient(135deg, #66d06b 0%, #56c45d 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isLargeScreen ? "50%" : "100%" }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.div
                    key={currentSlide}
                    className="flex h-full w-full flex-col items-center justify-center space-y-10 p-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-center font-sans text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] md:text-5xl">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="max-w-2xl text-center font-sans text-xl leading-relaxed text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] md:text-2xl">
                      <TypewriterText text={slides[currentSlide].content} />
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Navigation Dots 개선 */}
          <motion.div
            className={`fixed ${
              isLargeScreen
                ? "right-12 top-1/2 -translate-y-1/2 space-y-5"
                : "bottom-12 left-1/2 flex -translate-x-1/2 space-x-5"
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
                    const targetSlide = index + 1;
                    const totalSlides = slides.length;
                    const scrollProgress = targetSlide / (totalSlides - 1);

                    lenisRef.current?.scrollTo(containerRef.current!.scrollHeight * scrollProgress, {
                      duration: 1.2,
                      easing: (t) => t * (2 - t),
                    });

                    setCurrentSlide(targetSlide);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
