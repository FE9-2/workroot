import { Meta, StoryObj } from "@storybook/react";
import FilterDropdown from "@/app/components/button/dropdown/FilterDropdown";

const meta: Meta<typeof FilterDropdown> = {
  title: "Design System/Components/Dropdown/FilterDropdown",
  component: FilterDropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterDropdown>;

export const FilterDropdown_1: Story = {
  args: {
    options: ["전체", "공개", "비공개"],
  },
};
export const FilterDropdown_2: Story = {
  args: {
    options: ["전체", "모집 중", "모집 마감"],
  },
};
export const FilterDropdown_3: Story = {
  args: {
    options: ["전체", "거절", "면접 대기", "면접 완료", "채용 완료"],
  },
};
