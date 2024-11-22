import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

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
      options: ["normal", "wide"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const SolidNormal: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    width: "normal",
  },
};

export const SolidWide: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    width: "wide",
  },
};

export const SolidDisabled: Story = {
  args: {
    children: "Solid Button",
    variant: "solid",
    width: "normal",
    disabled: true,
  },
};

export const OutlinedNormal: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    width: "normal",
  },
};

export const OutlinedWide: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    width: "wide",
  },
};

export const OutlinedDisabled: Story = {
  args: {
    children: "Outlined Button",
    variant: "outlined",
    width: "normal",
    disabled: true,
  },
};
