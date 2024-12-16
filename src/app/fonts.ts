// app/fonts.ts
import localFont from "next/font/local";

// 학교안심 둥근미소
export const hakgyoFont = localFont({
  src: [
    {
      path: "../../public/fonts/hakgyo/HakgyoansimDunggeunmisoTTF-R.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/hakgyo/HakgyoansimDunggeunmisoTTF-B.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-hakgyo",
  display: "swap",
});

// 넥슨 Lv.1 고딕
export const nexonFont = localFont({
  src: [
    {
      path: "../../public/fonts/nexon/NexonLv1GothicOTF-R.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/nexon/NexonLv1GothicOTF-B.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nexon",
  display: "swap",
});
