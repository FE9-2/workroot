import FloatingBtn from "@/app/components/button/FloatingBtn";
import type { Meta, StoryObj } from "@storybook/react";
import { RiEdit2Fill } from "react-icons/ri";

const meta: Meta<typeof FloatingBtn> = {
  title: "Design System/Components/FloatingBtn",
  component: FloatingBtn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["orange", "white"],
    },
    icon: {
      control: "text",
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingBtn>;

// Orange 색상의 동그라미 버튼
export const OrangeCircle: Story = {
  args: {
    variant: "orange",
    icon: <RiEdit2Fill />,
  },
};

// 배경이 흰색인 버튼
export const WhiteCircle: Story = {
  args: {
    variant: "white",
    icon: <RiEdit2Fill />,
  },
};

// 아이콘과 글자가 있는 버튼
export const IconWithLabel: Story = {
  args: {
    variant: "orange",
    icon: <RiEdit2Fill />,
    label: "Edit",
  },
};
