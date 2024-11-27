import RadioBtn from "@/app/components/button/default/RadioBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RadioBtn> = {
  title: "Design System/Components/Button/RadioBtn",
  component: RadioBtn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioBtn>;

// 기본 사용법
export const Default: Story = {
  args: {
    label: "Option 1",
    name: "options",
    value: "option1",
    checked: true,
  },
};
