import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AlbaListLayout from "@/app/(pages)/albaList/layout";
import { StoryComponent } from "./page.stories";

const meta = {
  title: "Design System/Pages/AlbaList/Layout",
  component: AlbaListLayout,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof AlbaListLayout>;

export default meta;
type Story = StoryObj<typeof AlbaListLayout>;

// 기본 레이아웃 (데스크톱)
export const Desktop: Story = {
  render: () => <StoryComponent />,
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// 태블릿 레이아웃
export const Tablet: Story = {
  render: () => <StoryComponent />,
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

// 모바일 레이아웃
export const Mobile: Story = {
  render: () => <StoryComponent />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <div className="mx-auto max-w-screen-2xl px-4 py-8">
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div>로딩 중...</div>
      </div>
    </div>
  ),
};

// 빈 상태
export const Empty: Story = {
  render: () => (
    <div className="mx-auto max-w-screen-2xl px-4 py-8">
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <p className="text-grayscale-500">등록된 알바 공고가 없습니다.</p>
      </div>
    </div>
  ),
};
