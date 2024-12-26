"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "react-responsive";
import TypewriterText from "../components/animation/TypewriterText";
import { IoIosArrowDown } from "react-icons/io";
import LeafAnimation from "../components/animation/LeafAnimation";
import { Player } from "@lottiefiles/react-lottie-player";

// 버튼 타입 정의
interface ButtonType {
  text: string;
  href: string;
  primary: boolean;
  icon?: string; // 선택적 아이콘
}

// slides 배열 수정
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
    content: "마이페이지에서 스크랩한 공고를\n분석하고 지원 계획을 세우세요",
    image: "/images/land/step3-2.png",
    blackAreaTitle: "",
    blackAreaContent: "내 워크폼에서 작성한 공고를\n손쉽게 수정하고 삭제할 수 있어요",
    blackAreaImage: "/images/land/step3-1.png",
  },
  {
    id: 7,
    title: "쉽고 빨라요",
    content: "1분만에 알바폼을 만들어 보세요!\n링크를 복사하여 어디서든지 사용하세요.",
    image: "/images/land/s2.png",
  },
  {
    id: 9,
    title: "지금 바로 시작하세요",
    content: "더 나은 채용의 시작,\nWorkroot가 함께합니다",
    image: "/images/land/start.png",
    buttons: [
      {
        text: "채용 공고 구경하기",
        href: "/work-list",
        primary: true,
      },
      {
        text: "서비스 더 알아보기",
        href: "/signup",
        primary: false,
      },
    ],
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
                width:
                  currentSlide === 0 || currentSlide === 7 || currentSlide === 9
                    ? "100%"
                    : isLargeScreen
                      ? "50%"
                      : "100%",
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
                    className="h-full max-h-[600px] w-full max-w-[600px] object-contain"
                    priority
                  />
                ) : currentSlide === 4 || currentSlide === 5 ? (
                  <motion.div
                    key={currentSlide}
                    className="flex h-full w-full flex-col items-center justify-center space-y-8 p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* 이미지/애니메이션 섹션 */}
                    <motion.div className="relative mb-8 w-full max-w-[600px]">
                      <div className="relative w-full overflow-hidden rounded-2xl">
                        {currentSlide === 5 ? (
                          <div style={{ paddingBottom: "56.25%" }} className="relative">
                            <Player
                              autoplay
                              loop
                              src="/images/land/step3-1.json"
                              style={{ position: "absolute", width: "100%", height: "100%" }}
                            />
                          </div>
                        ) : (
                          <div style={{ paddingBottom: "56.25%" }}>
                            <Image
                              src={slides[currentSlide].blackAreaImage || ""}
                              alt={slides[currentSlide].blackAreaTitle || ""}
                              fill
                              className="object-contain transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, 600px"
                            />
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* 텍스트 섹션 - 장식 요소 제거 */}
                    <motion.div className="relative">
                      <motion.h2
                        className="text-center font-hakgyo text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                        style={{
                          background: "linear-gradient(to right, #71db77, #56c45d)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        <motion.span
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {slides[currentSlide].blackAreaTitle}
                        </motion.span>
                      </motion.h2>

                      <motion.div
                        className="mt-6 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <p className="whitespace-pre-wrap text-balance text-center font-hakgyo text-xl leading-relaxed text-white/90 md:text-xl lg:text-3xl">
                          <TypewriterText
                            text={slides[currentSlide].blackAreaContent || ""}
                            className="relative z-10"
                          />
                        </p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ) : currentSlide === 7 ? (
                  <motion.div
                    key={currentSlide}
                    className="flex h-full w-full flex-col items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className="relative w-full max-w-4xl rounded-3xl bg-gradient-to-b from-slate-800/30 to-slate-900/30 p-12 backdrop-blur-sm"
                      initial={{ scale: 0.95, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* 헤더 섹션 */}
                      <div className="text-center">
                        <motion.h2
                          className="font-hakgyo text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {slides[currentSlide].title}
                        </motion.h2>
                        <motion.p
                          className="mt-6 whitespace-pre-wrap text-balance text-center font-hakgyo text-xl leading-relaxed text-white/70 md:text-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          {slides[currentSlide].content}
                        </motion.p>
                      </div>

                      {/* 버튼 그룹 */}
                      <motion.div
                        className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {slides[currentSlide].buttons?.map((button: ButtonType, index) => (
                          <motion.a
                            key={index}
                            href={button.href}
                            className={`group relative flex min-w-[200px] items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 transition-all duration-300 ease-out ${
                              button.primary ? "bg-[#71db77] hover:bg-[#56c45d]" : "bg-white/10 hover:bg-white/20"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {button.icon && <span className="text-xl">{button.icon}</span>}
                            <span
                              className={`font-hakgyo text-lg font-medium ${
                                button.primary ? "text-slate-900" : "text-white"
                              }`}
                            >
                              {button.text}
                            </span>
                            <motion.div
                              className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                              style={{
                                background: "radial-gradient(circle at center, white 0%, transparent 70%)",
                              }}
                            />
                          </motion.a>
                        ))}
                      </motion.div>

                      {/* 장식 요소 */}
                      <div className="pointer-events-none absolute -inset-px rounded-3xl">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent" />
                      </div>
                    </motion.div>
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
                    <span className="mt-1 font-hakgyo text-xs font-semibold text-[#71db77]">scroll</span>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* 콘텐츠 섹션에 새로운 디자인 요소 추가 */}
            <AnimatePresence mode="wait">
              {/* 초록색 영역 - currentSlide가 0이나 7이 아닐 때만 표시 */}
              {currentSlide !== 0 && currentSlide !== 7 && currentSlide !== 9 && (
                <motion.div
                  className={`relative z-40 flex ${isLargeScreen ? "w-1/2" : "h-1/2 w-full"}`}
                  style={{
                    background: "linear-gradient(135deg, #71db77 0%, #56c45d 100%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: isLargeScreen ? "50%" : "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      className="flex h-full w-full flex-col items-center justify-center space-y-8 p-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* 이미지/애니메이션 섹션 */}
                      <motion.div
                        className="relative mb-8 w-full max-w-[600px]"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative w-full overflow-hidden rounded-2xl">
                          {currentSlide === 1 ? (
                            <div style={{ paddingBottom: "56.25%" }} className="relative">
                              <Player
                                autoplay
                                loop
                                src="/images/land/s2.json"
                                style={{ position: "absolute", width: "100%", height: "100%" }}
                              />
                            </div>
                          ) : currentSlide === 2 ? (
                            <div style={{ paddingBottom: "56.25%" }} className="relative">
                              <Player
                                autoplay
                                loop
                                src="/images/land/s3.json"
                                style={{ position: "absolute", width: "100%", height: "100%" }}
                              />
                            </div>
                          ) : currentSlide === 5 ? (
                            <div style={{ paddingBottom: "56.25%" }} className="relative">
                              <Player
                                autoplay
                                loop
                                src="/images/land/step3-2.json"
                                style={{ position: "absolute", width: "100%", height: "100%" }}
                              />
                            </div>
                          ) : (
                            <div style={{ paddingBottom: "56.25%" }}>
                              <Image
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                fill
                                className="object-contain transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, 600px"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>

                      {/* 텍스트 섹션 */}
                      <motion.div className="relative">
                        <motion.h2
                          className="text-center font-hakgyo text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                          style={{
                            color: "#ffffff",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            {slides[currentSlide].title}
                          </motion.span>
                        </motion.h2>

                        <motion.div
                          className="mt-6 max-w-2xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <p className="whitespace-pre-wrap text-balance text-center font-hakgyo text-lg leading-relaxed text-white/80 md:text-xl lg:text-3xl">
                            <TypewriterText text={slides[currentSlide].content} className="relative z-10" />
                          </p>
                        </motion.div>

                        {/* 텍스트 배경 효과 */}
                        <motion.div
                          className="absolute -inset-4 -z-10 rounded-xl opacity-50"
                          style={{
                            background:
                              "radial-gradient(circle at center, rgba(113,219,119,0.05) 0%, transparent 100%)",
                          }}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.5 }}
                          transition={{ duration: 1 }}
                        />
                      </motion.div>

                      {/* 장식적 요소 유지 */}
                      <motion.div
                        className="absolute left-0 top-0 h-32 w-32 opacity-20"
                        style={{
                          background: "radial-gradient(circle, rgba(113,219,119,0.3) 0%, transparent 70%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute bottom-0 right-0 h-40 w-40 opacity-20"
                        style={{
                          background: "radial-gradient(circle, rgba(113,219,119,0.3) 0%, transparent 70%)",
                          filter: "blur(40px)",
                        }}
                        animate={{
                          scale: [1.2, 1, 1.2],
                          opacity: [0.3, 0.2, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2,
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 네비게이션 도트 선 */}
          {currentSlide > 0 && (
            <motion.div
              className={`fixed ${
                isLargeScreen
                  ? "right-12 top-1/2 -translate-y-1/2 space-y-4"
                  : "bottom-12 left-1/2 flex -translate-x-1/2 space-x-4"
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
          )}
          <LeafAnimation />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
