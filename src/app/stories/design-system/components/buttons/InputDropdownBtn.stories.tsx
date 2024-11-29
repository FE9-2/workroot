import InputDropdownBtn from "@/app/components/button/dropdown/InputDropdownBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/Button/Dropdown/InputDropdownBtn",
  component: InputDropdownBtn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputDropdownBtn>;

export default meta;
type Story = StoryObj<typeof InputDropdownBtn>;

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "직접입력"],
    className: "",
  },
};
