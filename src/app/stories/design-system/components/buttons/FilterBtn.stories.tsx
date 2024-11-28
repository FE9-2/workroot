import { Meta, StoryObj } from "@storybook/react";
import Dropdown from "@/app/components/button/dropdown/FilterBtn";

const meta: Meta<typeof Dropdown> = {
  title: "Design System/Components/Button/Dropdown/FilterBtn",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const FilterDropdown_1: Story = {
  args: {
    label: "Options",
    options: ["전체", "공개", "비공개"],
  },
};
export const FilterDropdown_2: Story = {
  args: {
    label: "Options",
    options: ["전체", "모집 중", "모집 마감"],
  },
};
export const FilterDropdown_3: Story = {
  args: {
    label: "Options",
    options: ["전체", "거절", "면접 대기", "면접 완료", "채용 완료"],
  },
};
