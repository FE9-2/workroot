import { Metadata } from "next";

export const metadata: Metadata = {
  title: "알바폼",
  description: "알바 구인구직 서비스",
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
};
