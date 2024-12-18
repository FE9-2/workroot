"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import LinkBtn from "../components/button/default/LinkBtn";
import { hakgyoFont } from "../fonts";

export default function Home() {
  const [visibleSections, setVisibleSections] = useState(new Set<string>());
  const [contentOpacity, setContentOpacity] = useState(0);
  const [footerOpacity, setFooterOpacity] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setContentOpacity(1);
    if (typeof window !== "undefined" && typeof IntersectionObserver !== "undefined") {
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            const id = element.dataset.id ?? "";
            if (id) {
              if (entry.isIntersecting) {
                setVisibleSections((prev) => new Set(prev).add(id));
              } else {
                setVisibleSections((prev) => {
                  const newSet = new Set(prev);
                  newSet.delete(id);
                  return newSet;
                });
              }
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      const targets = document.querySelectorAll("[data-id]");
      targets.forEach((target) => observer.current?.observe(target));

      return () => {
        targets.forEach((target) => observer.current?.unobserve(target));
      };
    }
  }, []);

  useEffect(() => {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterOpacity(1);
        }
      },
      { threshold: 0.8 }
    );

    const footerElement = document.querySelector("[data-id='footer-cta']");
    if (footerElement) {
      footerObserver.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        footerObserver.unobserve(footerElement);
      }
    };
  }, []);

  const features = [
    {
      id: "feature-01",
      number: "01",
      title: "어디서든 지원받으세요",
      description: "다양한 사이트, SNS, 문자까지 언제 어디서든 직원을 구해보세요",
      imageSrc: "/images/land/2.webp",
    },
    {
      id: "feature-02",
      number: "02",
      title: "한 곳에서 쉽게 관리하세요",
      description: "워크폼 관리 페이지에서 지원현황을 확인하고, 지원자별 상태를 관리할 수 있습니다",
      imageSrc: "/images/land/3.webp",
    },
    {
      id: "feature-03",
      number: "03",
      title: "쉽고 빨라요",
      description: "1분만에 워크폼을 만들어보세요! 링크를 복사하여 어디서든지 사용하세요",
      imageSrc: "/images/land/4.webp",
    },
    {
      id: "feature-04",
      number: "04",
      title: "쉽고 빠르게 지원",
      description: "간단한 정보 입력만으로 지원이 가능합니다",
      imageSrc: "/images/land/5.webp",
    },
  ];

  return (
    <div
      className={`flex min-w-[320px] flex-grow flex-col ${hakgyoFont.variable} overflow-x-hidden bg-white font-sans text-sm`}
    >
      {/* 히어로 섹션 */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/land/1.jpg"
            alt="Hero Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
            className="brightness-50"
          />
        </div>
        {/* Content */}
        <div
          className="relative z-10 w-full max-w-[300px] text-center sm:max-w-[70%] lg:max-w-[860px]"
          style={{
            opacity: contentOpacity,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h1 className="mb-2 mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl lg:leading-relaxed">
            WorkRoot
          </h1>
          <p className="mb-5 text-base font-normal leading-snug text-white sm:text-lg md:text-xl lg:text-2xl lg:leading-relaxed">
            뿌리를 내리며 성장하는 구인구직 플랫폼
          </p>
          <div className="flex flex-row justify-center space-x-4">
            <LinkBtn
              href="/work-list"
              variant="outlined"
              width="lg"
              height="lg"
              fontSize="lg"
              color="lime"
              disabled={false}
              className="rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-white hover:text-[#44813c]"
            >
              둘러보기
            </LinkBtn>
            <LinkBtn
              href="/register"
              variant="outlined"
              width="lg"
              height="lg"
              fontSize="lg"
              color="lime"
              disabled={false}
              className="rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-bold text-white shadow-lg transition duration-300 hover:bg-white hover:text-[#44813c]"
            >
              회원가입
            </LinkBtn>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="bg-[#44813c]/20 py-12 md:py-16">
        <div className="container mx-auto max-w-screen-xl px-4">
          <div className="opacity-0 transition-opacity duration-1000 ease-in-out" data-id="features-intro"></div>
          <div className="space-y-12 md:space-y-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                {...feature}
                direction={index % 2 === 0 ? "left" : "right"}
                isVisible={visibleSections.has(feature.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* UI 섹션 */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-[1600px] px-4">
          <h2 className="mb-12 text-center text-3xl font-medium leading-snug text-[#44813c] lg:leading-relaxed">
            WorkRoot 사용 방법
          </h2>
          <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
            {[
              { step: 1, text: "워크루트에 가입해 꿈을 위한 뿌리를 내리세요" },
              { step: 2, text: "간단한 워크폼 등록으로 성장의 기회를 만드세요" },
              { step: 3, text: "지원자 분들의 싹을 틔울 일자리를 찾아보세요" },
              { step: 4, text: "간편하게 지원서를 작성하고 여러분들의 시작을 꽃피우세요 " },
            ].map(({ step, text }) => (
              <div
                key={step}
                data-id={`step-${step}`}
                className={`relative flex flex-col items-center justify-between opacity-0 transition-all duration-700 ease-in-out md:flex-row ${
                  visibleSections.has(`step-${step}`) ? "translate-y-0 opacity-100" : "translate-y-10"
                }`}
              >
                <div className={`md:w-1/2 ${step % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <Image
                    src={`/images/land/step${step}.jpg`}
                    alt={`Step ${step}`}
                    width={400}
                    height={240}
                    className="h-[400px] w-full rounded-lg object-contain shadow-xl"
                  />
                </div>
                <div
                  className={`mt-4 md:mt-0 md:flex md:w-1/2 md:items-start ${
                    step % 2 === 0 ? "md:order-1 md:pr-8" : "md:order-2 md:pl-8"
                  }`}
                >
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-[#44813c] md:text-2xl">Step {step}</h3>
                    <p className="text-2xl font-medium text-gray-600">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA 섹션 */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden" data-id="footer-cta">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/land/foot.jpg"
            alt="Footer CTA Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-[300px] text-center sm:max-w-[70%] lg:max-w-[860px]"
          style={{
            opacity: footerOpacity,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h2 className="mb-4 text-2xl font-semibold text-gray-600 md:text-3xl">지금 바로 시작하세요</h2>
          <p className="mb-6 inline-block rounded bg-[#44813c] p-2 text-2xl font-semibold text-white">
            WorkRoot가 여러분의 성장의 길을 열어드립니다
          </p>
          <div className="flex flex-row justify-center space-x-4">
            <LinkBtn
              href="/work-list"
              variant="outlined"
              width="lg"
              height="lg"
              fontSize="lg"
              color="lime"
              disabled={false}
              className="rounded-md border-2 border-[#44813c] bg-transparent px-6 py-3 text-base font-bold text-[#44813c] shadow-lg transition duration-300 hover:bg-[#44813c] hover:text-white"
            >
              둘러보기
            </LinkBtn>
            <LinkBtn
              href="/register"
              variant="outlined"
              width="lg"
              height="lg"
              fontSize="lg"
              color="lime"
              disabled={false}
              className="rounded-md border-2 border-[#44813c] bg-transparent px-6 py-3 text-base font-bold text-[#44813c] shadow-lg transition duration-300 hover:bg-[#44813c] hover:text-white"
            >
              회원가입
            </LinkBtn>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  id: string;
  number: string;
  title: string;
  description: string;
  imageSrc: string;
  direction: "left" | "right";
  isVisible: boolean;
}

function FeatureCard({ id, number, title, description, imageSrc, direction, isVisible }: FeatureCardProps) {
  return (
    <div
      data-id={id}
      className={`flex transform flex-col items-center justify-between rounded-lg bg-white py-8 shadow-lg transition-all duration-1000 ease-in-out md:flex-row md:py-10 ${
        isVisible
          ? "translate-x-0 opacity-100"
          : direction === "left"
            ? "-translate-x-20 opacity-0"
            : "translate-x-20 opacity-0"
      }`}
    >
      <div className={`md:w-1/3 ${direction === "left" ? "md:order-1" : "md:order-2"} px-6 md:px-8`}>
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={300}
          className="h-[280px] w-full rounded-lg object-contain shadow-xl"
        />
      </div>
      <div
        className={`mt-6 md:mt-0 md:w-2/3 ${direction === "left" ? "md:order-2 md:pl-6" : "md:order-1 md:pr-6"} px-6 md:px-8`}
      >
        <span className="mb-2 block text-2xl font-bold text-[#44813c] md:text-2xl">{number}</span>
        <h3 className="mb-3 text-2xl font-bold">
          <span className="inline-block rounded bg-[#44813c] p-2 text-white">{title}</span>
        </h3>
        <p className="text-2xl font-medium text-gray-600">{description}</p>
      </div>
    </div>
  );
}
