import CheckBtn from "@/app/components/button/CheckBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CheckBtn> = {
  title: "Design System/Components/Buttons/CheckBtn",
  component: CheckBtn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBtn>;

// 기본 사용법
export const Default: Story = {
  args: {
    label: "Option 1",
    name: "options",
    value: "option1",
    checked: false,
    disabled: false,
  },
};

// 선택된 체크박스 예시
export const Checked: Story = {
  args: {
    label: "Option 2",
    name: "options",
    value: "option2",
    checked: true,
    disabled: false,
  },
};

// 비활성화된 체크박스 예시
export const Disabled: Story = {
  args: {
    label: "Option 3",
    name: "options",
    value: "option3",
    checked: false,
    disabled: true,
  },
};
