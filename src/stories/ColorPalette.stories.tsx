import { Meta, StoryFn } from "@storybook/react";
import React from "react";

const colors = {
  primary: {
    green: {
      100: "#E8F5E9",
      200: "#C8E6C9",
      300: "#A5D6A7",
      400: "#66BB6A",
      500: "#4CAF50",
      600: "#388E3C",
      700: "#2E7D32",
    },
    brown: {
      100: "#D7CCC8",
      200: "#BCAAA4",
      300: "#A98274",
      400: "#8D6E63",
      500: "#8B4513",
      600: "#6D4C41",
      700: "#5D4037",
    },
    yellow: {
      100: "#FFF9C4",
      200: "#FFF59D",
      300: "#FFF176",
      400: "#FFEB3B",
      500: "#FFD700",
      600: "#FBC02D",
      700: "#F9A825",
    },
  },
  secondary: {
    beige: "#F5F5DC",
    lightGreen: "#A8D5BA",
    orange: {
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF9800",
      600: "#F57C00",
      700: "#EF6C00",
    },
    teal: {
      100: "#B2EBF2",
      200: "#80DEEA",
      300: "#4DD0E1",
      400: "#26C6DA",
      500: "#00BCD4",
      600: "#00ACC1",
      700: "#0097A7",
    },
  },
  neutral: {
    white: "#FFFFFF",
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
    },
    darkGray: "#4E4E4E",
    black: "#212121",
  },
  accent: {
    blue: {
      100: "#BBDEFB",
      200: "#90CAF9",
      300: "#64B5F6",
      400: "#4DA8DA",
      500: "#2196F3",
      600: "#1E88E5",
      700: "#1976D2",
    },
    purple: {
      100: "#E1BEE7",
      200: "#CE93D8",
      300: "#BA68C8",
      400: "#AB47BC",
      500: "#9C27B0",
      600: "#8E24AA",
      700: "#7B1FA2",
    },
  },
};

// 주어진 color와 label을 사용하여 색상 박스를 렌더링
const ColorBox = ({ color, label }: { color: string; label: string }) => (
  <div style={{ margin: "10px", textAlign: "center" }}>
    <div style={{ backgroundColor: color, width: "100px", height: "100px", margin: "0 auto" }}></div>
    <div>{label}</div>
    <div>{color}</div>
  </div>
);

// colors 객체를 순회하며 각 색상 카테고리와 색상을 시각적으로 보여줌
const ColorPalette = () => (
  <div>
    {Object.entries(colors).map(([categoryName, category]) => (
      <div key={categoryName}>
        <h2>{categoryName}</h2>
        {Object.entries(category).map(([colorName, colorValue]) => (
          <div key={colorName}>
            <h3>{colorName}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {typeof colorValue === "string" ? (
                <ColorBox color={colorValue} label={`${categoryName} ${colorName}`} />
              ) : (
                Object.entries(colorValue).map(([shade, color]) => (
                  <ColorBox
                    key={`${colorName}-${shade}`}
                    color={color}
                    label={`${categoryName} ${colorName} ${shade}`}
                  />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

// Storybook에서 이 스토리를 어떻게 보여줄지 설정
export default {
  title: "Design System/Colors", // 스토리가 표시될 위치를 정의
  component: ColorPalette, // 스토리가 사용할 컴포넌트를 정의
} as Meta;

const Template: StoryFn = () => <ColorPalette />;

export const Default = Template.bind({});
