import SortDropdown from "@/app/components/dropdown/SortDropdown";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SortDropdown> = {
  title: "Design System/Components/Dropdown/SortDropdown",
  component: SortDropdown,
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
type Story = StoryObj<typeof SortDropdown>;

export const SortDropdownBtn: Story = {
  args: {
    label: "Sort",
    options: ["최신순", "시급높은순", "지원자 많은순", "스크랩 많은순"],
    className: "",
  },
};
