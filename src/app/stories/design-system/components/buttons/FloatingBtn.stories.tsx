import FloatingBtn from "@/app/components/button/default/FloatingBtn";
import type { Meta, StoryObj } from "@storybook/react";
import { RiEdit2Fill } from "react-icons/ri";

const meta: Meta<typeof FloatingBtn> = {
  title: "Design System/Components/Button/FloatingBtn",
  component: FloatingBtn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["orange", "white"],
    },
    children: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingBtn>;

export const OrangeCircle: Story = {
  args: {
    variant: "orange",
    icon: <RiEdit2Fill />,
  },
};

export const WhiteCircle: Story = {
  args: {
    variant: "white",
    icon: <RiEdit2Fill />,
  },
};

export const IconWithLabel: Story = {
  args: {
    variant: "orange",
    icon: <RiEdit2Fill />,
    children: "텍스트",
  },
};
