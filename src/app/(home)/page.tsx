"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";

const slides = [
  { id: 1, image: "/brand.png", title: "Brand Image" },
  {
    id: 2,
    title: "어디서든 지원받으세요",
    content: "다양한 사이트, SNS, 문자까지 언제 어디서든 직원을 구해보세요",
    image: "/images/land/s2.webp",
  },
  {
    id: 3,
    title: "한 곳에서 쉽게 관리하세요",
    content: "워크폼 관리 페이지에서 지원 현황을 확인하고, 지원자별 상태를 관리할 수 있습니다다",
    image: "/images/land/2.webp",
  },
  {
    id: 4,
    title: "쉽고 빨라요",
    content: "1분만에 워크폼을 만들어보세요! 링크를 복사하여 어디서든 사용하세요",
    image: "/images/land/2.webp",
  },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    setIsLoaded(true);
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 5,
      touchMultiplier: 3,
      infinite: true,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisRef.current.on("scroll", ({ progress }: { progress: number }) => {
      if (!isScrollingRef.current) {
        const totalSlides = slides.length;
        const newSlideIndex = Math.floor(progress * totalSlides) % totalSlides;
        if (newSlideIndex !== currentSlide) {
          setCurrentSlide(newSlideIndex);
          isScrollingRef.current = true;
          const targetScroll = (newSlideIndex / totalSlides) * containerRef.current!.scrollHeight;
          lenisRef.current?.scrollTo(targetScroll, {
            immediate: false,
            duration: 800,
            easing: (t: number) => t * (2 - t),
          });
          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
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
  }, [currentSlide]);

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          ref={containerRef}
          className="h-[400vh] overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]"
        >
          <div className="fixed inset-0 flex">
            <motion.div
              className="relative h-full"
              animate={{
                width: currentSlide === 0 ? "100%" : "50%",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute"
                initial={{ opacity: 0, width: 800, height: 800, left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                animate={{
                  opacity: 1,
                  width: currentSlide === 0 ? 800 : 600,
                  height: currentSlide === 0 ? 800 : 600,
                }}
                transition={{
                  opacity: { duration: 1, ease: "easeInOut" },
                  width: { duration: 0.8, ease: "easeInOut" },
                  height: { duration: 0.8, ease: "easeInOut" },
                }}
              >
                <Image src="/brand.png" alt="Brand Logo" fill className="object-contain" priority />
              </motion.div>
            </motion.div>
            <AnimatePresence mode="wait">
              {currentSlide > 0 && (
                <motion.div
                  key={currentSlide}
                  className="relative z-40 flex h-full w-1/2 flex-col justify-center p-12"
                  style={{ background: "linear-gradient(135deg, #71db77 0%, #56c45d 100%)" }}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.h2
                    className="mb-6 text-4xl font-bold text-gray-100"
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
                  >
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      width={400}
                      height={300}
                      className="mb-6 object-cover"
                      priority
                    />
                  </motion.div>
                  <motion.p
                    className="text-lg text-gray-200"
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
            <div className="fixed right-4 top-1/2 z-10 -translate-y-1/2 space-y-2">
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
