import { Meta, StoryObj } from "@storybook/react";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";

const meta: Meta<typeof FilterDropdown> = {
  title: "Design System/Components/Dropdown/FilterDropdown",
  component: FilterDropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "추가적인 스타일링을 위한 클래스",
    },
    readOnly: {
      control: "boolean",
      description: "읽기 전용 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterDropdown>;

export const Small: Story = {
  args: {
    options: ["전체", "공개", "비공개"],
    className: "w-20",
  },
};

export const Medium: Story = {
  args: {
    options: ["전체", "모집 중", "모집 마감"],
    className: "w-28",
  },
};

export const Large: Story = {
  args: {
    options: ["최신순", "시급높은순", "지원자 많은순", "스크랩 많은순"],
    className: "w-36",
  },
};

export const CustomWidth: Story = {
  args: {
    options: ["전체", "거절", "면접 대기", "면접 완료", "채용 완료"],
    className: "w-[180px]",
  },
};

export const ReadOnly: Story = {
  args: {
    options: ["최신순"],
    className: "w-28",
    readOnly: true,
  },
};
