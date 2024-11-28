import { Meta, StoryObj } from "@storybook/react";
import FilterDropdown from "@/app/components/dropdown/FilterDropdown";

const meta: Meta<typeof FilterDropdown> = {
  title: "Design System/Components/Dropdown/FilterDropdown",
  component: FilterDropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterDropdown>;

export const Default: Story = {
  args: {
    label: "Options",
    options: ["전체", "공개", "비공개", "거절", "면접 대기", "면접 완료", "채용 완료"],
  },
};
