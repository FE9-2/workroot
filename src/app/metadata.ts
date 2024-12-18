import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000"),
  title: {
    default: "워크루트 | 알바 구인구직 서비스",
    template: "%s | 워크루트",
  },
  description: "간편한 알바 구인구직 서비스, 워크루트에서 시작하세요.",
  keywords: ["알바", "구인", "구직", "아르바이트", "워크루트", "일자리", "채용"],
  authors: [{ name: "워크루트" }],
  creator: "워크루트",
  publisher: "워크루트",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    // 기본 favicon
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    // Apple 기기를 위한 아이콘
    apple: [
      {
        url: "/apple-icon-180x180.png",
        sizes: "180x180",
      },
    ],
    // PWA를 위한 아이콘들
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  // 웹 앱 매니페스트
  manifest: "/site.webmanifest",

  // Open Graph
  openGraph: {
    type: "website",
    siteName: "워크루트",
    title: "워크루트 | 알바 구인구직 서비스",
    description: "간편한 알바 구인구직 서비스, 워크루트에서 시작하세요.",
    images: [
      {
        url: "/og-image.png", // Open Graph 이미지 경로
        width: 1200,
        height: 630,
        alt: "워크루트 미리보기",
      },
    ],
    locale: "ko_KR",
  },

  // 검색엔진 인증
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },

  // 추가 메타 태그
  other: {
    "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || "",
    "facebook-domain-verification": process.env.NEXT_PUBLIC_FB_DOMAIN_VERIFICATION || "",
  },
};
