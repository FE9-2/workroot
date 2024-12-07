import type { Meta, StoryObj } from "@storybook/react";
import AlbaList from "./page";
import AlbaListLayout from "@/app/(pages)/albaList/layout";

const meta = {
  title: "Design System/Pages/AlbaList",
  component: AlbaList,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/albaList",
        query: {
          isRecruiting: "true",
        },
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <AlbaListLayout>
        <Story />
      </AlbaListLayout>
    ),
  ],
} satisfies Meta<typeof AlbaList>;

export default meta;
type Story = StoryObj<typeof AlbaList>;

// 기본 목록 페이지
export const Default: Story = {};

// 모바일 뷰
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
  },
};

// 태블릿 뷰
export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

// 데스크톱 뷰
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// 로딩 상태
export const Loading: Story = {
  parameters: {
    mockData: {
      loading: true,
    },
  },
};

// 빈 상태
export const Empty: Story = {
  parameters: {
    mockData: {
      empty: true,
    },
  },
};
