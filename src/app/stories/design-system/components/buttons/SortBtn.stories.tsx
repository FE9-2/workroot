import SortBtn from "@/app/components/button/dropdown/SortBtn";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SortBtn> = {
  title: "Design System/Components/Button/Dropdown/SortBtn",
  component: SortBtn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    className: { control: "text" },
    onSortChange: { action: "sort changed" },
  },
};

export default meta;
type Story = StoryObj<typeof SortBtn>;

export const SortDropdownBtn: Story = {
  args: {
    label: "Sort",
    options: ["최신순", "시급높은순", "지원자 많은순", "스크랩 많은순"],
    className: "",
  },
};
