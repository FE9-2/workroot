import RecruitListItem from "@/app/components/card/cardList/RecruitListItem";
import type { Meta, StoryObj } from "@storybook/react";
import ModalLayout from "@/app/components/modal/ModalLayout";

const meta: Meta<typeof RecruitListItem> = {
  title: "Design System/Components/Card/CardList/RecruitListItem",
  component: RecruitListItem,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
      navigation: {
        push: () => {},
        replace: () => {},
        prefetch: () => {},
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-white p-4">
        <Story />
        <ModalLayout />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecruitListItem>;

const mockProps = {
  id: "1",
  imageUrls: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=1974&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
  ],
  isPublic: true,
  recruitmentStartDate: new Date("2024-06-01"),
  recruitmentEndDate: new Date("2024-12-31"),
  title: "서울 강남구 카페 직원 모집합니다",
  applyCount: 5,
  scrapCount: 10,
  location: "서울특별시 강남구 역삼동",
  onEdit: () => console.log("Edit clicked"),
  onDelete: () => console.log("Delete clicked"),
};

// 640px 미만
export const Mobile: Story = {
  args: {
    ...mockProps,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1", // 320px
    },
  },
};

// sm (640px ~ 768px)
export const Tablet: Story = {
  args: {
    ...mockProps,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet", // 640px
    },
  },
};

// md 이상 (768px 이상)
export const Desktop: Story = {
  args: {
    ...mockProps,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop", // 768px 이상
    },
  },
};

// 비공개 게시글
export const PrivatePost: Story = {
  args: {
    ...mockProps,
    isPublic: false,
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    ...mockProps,
    title: "서울 강남구 카페에서 주말 아르바이트 직원을 모집합니다. 경력자 우대, 성실한 분 환영합니다.",
  },
};

// 긴 주소
export const LongLocation: Story = {
  args: {
    ...mockProps,
    location: "서울특별시 강남구 역삼동 테헤란로 123길 45, 67층 890호 (주)알바가게",
  },
};

// 높은 지원자/스크랩 수
export const HighStats: Story = {
  args: {
    ...mockProps,
    applyCount: 999,
    scrapCount: 999,
  },
};

// 마감 임박
export const NearDeadline: Story = {
  args: {
    ...mockProps,
    recruitmentEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 내일
  },
};
