import FrameRadioBtn from "@/app/components/button/FrameRadioBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FrameRadioBtn> = {
  title: "Design System/Components/FrameRadioBtn",
  component: FrameRadioBtn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    name: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    onChange: { action: "changed" },
    width: { control: "radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FrameRadioBtn>;

// 기본 사용법
export const Default: Story = {
  args: {
    label: "Option 1",
    name: "options",
    value: "option1",
    checked: false,
    width: "sm",
  },
};

// 선택된 라디오 버튼 예시
export const Checked: Story = {
  args: {
    label: "Option 2",
    name: "options",
    value: "option2",
    checked: true,
    width: "sm",
  },
};
