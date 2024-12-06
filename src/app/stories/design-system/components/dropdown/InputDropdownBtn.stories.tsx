import InputDropdown from "@/app/components/button/dropdown/InputDropdown";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/Dropdown/InputDropdown",
  component: InputDropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputDropdown>;

export default meta;
type Story = StoryObj<typeof InputDropdown>;

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "직접입력"],
    className: "",
  },
};
export const Error: Story = {
  args: {
    options: ["Option 1", "Option 2", "직접입력"],
    className: "",
    errormessage: "에러 메시지",
  },
};
