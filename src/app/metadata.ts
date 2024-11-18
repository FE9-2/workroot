import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "워크루트",
  description: "워크루트(WorkRoot) 프로젝트",
  keywords: ["워크루트", "WorkRoot", "알바", "알바천국", "알바천국 프로젝트"],
  authors: [{ name: "FE9-2" }],
  openGraph: {
    title: "워크루트",
    description: "워크루트(WorkRoot) 프로젝트",
    url: "https://workroot.life",
    siteName: "워크루트(WorkRoot)",
    images: [
      {
        url: "https://workroot.life/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "워크루트",
    description: "워크루트(WorkRoot) 프로젝트",
    images: ["https://workroot.life/og-image.jpg"],
  },
  verification: {
    google: "구글 인증 코드",
  },
};
