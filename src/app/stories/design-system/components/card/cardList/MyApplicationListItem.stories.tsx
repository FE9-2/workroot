import MyApplicationListItem from "@/app/components/card/cardList/MyApplicationListItem";
import { applicationStatus } from "@/types/applicationStatus";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MyApplicationListItem> = {
  title: "Design System/Components/Card/CardList/MyApplicationListItem",
  component: MyApplicationListItem,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof MyApplicationListItem>;

const mockProps = {
  id: 1,
  createdAt: new Date("2024-03-21T14:30:00"),
  updatedAt: new Date("2024-03-21T14:30:00"),
  status: applicationStatus.INTERVIEW_PENDING,
  resumeName: "이력서.pdf",
  resumeId: 123,
  form: {
    owner: {
      imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
      storeName: "스타벅스 강남점",
      id: 1,
    },
    recruitmentEndDate: new Date("2024-12-31T00:00:00.000Z"),
    recruitmentStartDate: new Date("2024-06-01T00:00:00.000Z"),
    description:
      "스타벅스 강남점에서 함께할 파트타이머를 모집합니다. 주말 근무 가능자 우대, 경력자 우대, 장기 근무자 우대",
    title: "스타벅스 강남점 파트타이머 모집",
    id: 1,
  },
};

// 기본 상태
export const Default: Story = {
  args: {
    ...mockProps,
  },
};

// 면접 대기 상태
export const InterviewPending: Story = {
  args: {
    ...mockProps,
    status: applicationStatus.INTERVIEW_PENDING,
  },
};

// 면접 완료 상태
export const InterviewCompleted: Story = {
  args: {
    ...mockProps,
    status: applicationStatus.INTERVIEW_COMPLETED,
  },
};

// 채용 완료 상태
export const Hired: Story = {
  args: {
    ...mockProps,
    status: applicationStatus.HIRED,
  },
};

// 거절 상태
export const Rejected: Story = {
  args: {
    ...mockProps,
    status: applicationStatus.REJECTED,
  },
};

// 모집 종료된 공고
export const RecruitmentClosed: Story = {
  args: {
    ...mockProps,
    form: {
      ...mockProps.form,
      recruitmentEndDate: new Date("2024-01-01T00:00:00.000Z"),
    },
  },
};

// 긴 설명
export const LongDescription: Story = {
  args: {
    ...mockProps,
    form: {
      ...mockProps.form,
      description:
        "스타벅스 강남점에서 함께할 파트타이머를 모집합니다. 주말 근무 가능자 우대, 경력자 우대, 장기 근무자 우대. 스타벅스 강남점에서 함께할 파트타이머를 모집합니다. 주말 근무 가능자 우대, 경력자 우대, 장기 근무자 우대.",
    },
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    ...mockProps,
    form: {
      ...mockProps.form,
      title: "스타벅스 강남점 파트타이머 모집 - 주말 근무 가능자 우대, 경력자 우대, 장기 근무자 우대",
    },
  },
};
