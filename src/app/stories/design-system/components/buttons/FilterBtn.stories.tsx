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

export const FilterDropdown: Story = {
  args: {
    label: "Options",
    options: ["전체", "공개", "비공개", "거절", "면접 대기", "면접 완료", "채용 완료"],
  },
};
