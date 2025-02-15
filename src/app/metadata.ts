import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN_URL || "http://localhost:3000"),
  title: {
    default: "워크루트 | 구인구직 플랫폼",
    template: "%s | 워크루트",
  },
  description: "간편한 알바 구인구직 플랫폼, 워크루트에서 시작하세요.",
  keywords: ["알바", "구인", "구직", "아르바이트", "워크루트", "일자리", "채용"],
  authors: [{ name: "워크루트" }],

  // 기본 아이콘 설정
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon-180x180.png",
  },

  // Open Graph 설정
  openGraph: {
    type: "website",
    siteName: "워크루트",
    title: "워크루트 | 구인구직 플랫폼",
    description: "간편한 알바 구인구직 플랫폼, 워크루트에서 시작하세요.",
    url: process.env.NEXT_PUBLIC_DOMAIN_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "워크루트 미리보기",
      },
    ],
    locale: "ko_KR",
  },

  // 기본 메타 설정
  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};
