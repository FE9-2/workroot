import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AlbaListLayout from "@/app/(pages)/albaList/layout";

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

// 레이아웃 예시 컴포넌트
const LayoutExample = () => (
  <div className="space-y-4">
    {/* 필터 섹션 레이아웃 */}
    <div className="border-b border-grayscale-100 bg-white">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-2 px-4 py-4 md:px-6 lg:px-8">
        <div className="h-10 w-28 rounded bg-grayscale-100" />
        <div className="h-10 w-28 rounded bg-grayscale-100" />
      </div>
    </div>

    {/* 그리드 레이아웃 */}
    <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-2 lg:px-8 2xl:grid-cols-3 2xl:gap-12">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="h-64 rounded-lg bg-grayscale-100" />
      ))}
    </div>
  </div>
);

// 데스크톱 레이아웃
export const Desktop: Story = {
  render: () => (
    <AlbaListLayout>
      <LayoutExample />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// 태블릿 레이아웃
export const Tablet: Story = {
  render: () => (
    <AlbaListLayout>
      <LayoutExample />
    </AlbaListLayout>
  ),
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

// 모바일 레이아웃
export const Mobile: Story = {
  render: () => (
    <AlbaListLayout>
      <LayoutExample />
    </AlbaListLayout>
  ),
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
