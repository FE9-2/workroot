import Button from "@/app/components/button/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { RiEdit2Fill } from "react-icons/ri";

const meta = {
  title: "Design System/Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["solid", "outlined"],
    },
    width: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    radius: {
      control: "radio",
      options: ["lg", "full"],
    },
    icon: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const SolidNormal: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    width: "md",
    radius: "lg",
  },
};

export const SolidWide: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    width: "lg",
  },
};

export const SolidDisabled: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    width: "md",
    disabled: true,
  },
};

export const OutlinedNormal: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    width: "md",
    radius: "lg",
  },
};

export const OutlinedWide: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    width: "lg",
  },
};

export const OutlinedDisabled: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    width: "md",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Button with Icon",
    variant: "solid",
    width: "md",
    radius: "lg",
    icon: <RiEdit2Fill />,
  },
};
