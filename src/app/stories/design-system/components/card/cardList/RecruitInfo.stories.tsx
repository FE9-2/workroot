import RecruitInfo from "@/app/components/card/cardList/RecruitInfo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RecruitInfo> = {
  title: "Design System/Components/Card/CardList/RecruitInfo",
  component: RecruitInfo,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RecruitInfo>;

const mockProps = {
  hourlyWage: 10000,
  recruitmentStartDate: new Date("2024-06-01"),
  recruitmentEndDate: new Date("2024-12-31"),
  workStartTime: "06:00",
  workEndTime: "21:00",
  isNegotiableWorkDays: false,
  workDays: ["MONDAY", "WEDNESDAY", "FRIDAY"],
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

// 연속된 요일 케이스
export const ConsecutiveDays: Story = {
  args: {
    ...mockProps,
    workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
  },
};

// 부분 연속 요일 케이스
export const PartialConsecutiveDays: Story = {
  args: {
    ...mockProps,
    workDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "FRIDAY"],
  },
};

// 주말 연속 요일 케이스
export const WeekendConsecutiveDays: Story = {
  args: {
    ...mockProps,
    workDays: ["MONDAY", "TUESDAY", "SATURDAY", "SUNDAY"],
  },
};

// 요일협의 가능한 케이스
export const NegotiableWorkDays: Story = {
  args: {
    ...mockProps,
    isNegotiableWorkDays: true,
  },
};
