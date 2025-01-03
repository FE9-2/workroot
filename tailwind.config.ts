import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "./src/app/globals.css",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        black: {
          100: "#6B6B6B",
          200: "#525252",
          300: "#373737",
          400: "#1F1F1F",
          500: "#040404",
        },
        grayscale: {
          50: "#FFFFFF",
          100: "#DEDEDE",
          200: "#C4C4C4",
          300: "#ABABAB",
          400: "#999999",
          500: "#808080",
        },
        primary: {
          orange: {
            50: "#fbfffd",
            100: "#bde3bf",
            200: "#94d597",
            300: "#5ebd63", // 사용자 브랜드 색상
            350: "#41a14a",
            400: "#4b9f4d",
            500: "#008957",
          },
          blue: {
            50: "#ebf2ff",
            60: "#f1fcff",
            70: "#effffe",
            100: "#535779",
            200: "#3E415B",
            300: "#2A2C3D",
          },
        },
        background: {
          100: "#FCFCFC",
          200: "#F7F7F7",
          300: "#EFEFEF",
        },
        line: {
          100: "#F2F2F2",
          200: "#E6E6E6",
        },
        state: {
          error: "#FC4100",
        },
        header: {
          100: "#7eca82",
        },
      },
      fontFamily: {
        nexon: ["var(--font-nexon)", "sans-serif"],
        hakgyo: ["var(--font-hakgyo)", "sans-serif"],
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
};

export default config;
