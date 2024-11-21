import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
          100: "#DEDEDE",
          200: "#C4C4C4",
          300: "#ABABAB",
          400: "#999999",
          500: "#808080",
        },
        primary: {
          orange: {
            50: "#FFF7EB",
            100: "#FCC369",
            200: "#FBAF37",
            300: "#F89A05",
            400: "#E18C05",
          },
          blue: {
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
          error: "FC4100",
        },
      },
      fontFamily: {
        gothic: [
          "Gothic A1",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Helvetica Neue",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
        school: ["HakgyoansimDunggeunmisoTTF-R", "HakgyoansimDunggeunmisoTTF-B", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
