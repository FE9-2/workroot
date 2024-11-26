import Chip from "@/app/components/button/default/Chip";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Chip> = {
  title: "Design System/Components/Button/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    label: { control: "text" },
    deletable: { control: "boolean" },
    selected: { control: "boolean" },
    className: { control: "text" },
    onDelete: { action: "delete clicked" },
    onClick: { action: "chip clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: "Default Chip",
    deletable: false,
    selected: false,
    className: "",
  },
};

export const Deletable: Story = {
  args: {
    label: "Deletable Chip",
    deletable: true,
    selected: false,
    className: "",
  },
};

export const Selected: Story = {
  args: {
    label: "Selected Chip",
    deletable: false,
    selected: true,
    className: "",
  },
};

export const CustomStyled: Story = {
  args: {
    label: "Custom Chip",
    deletable: true,
    selected: false,
    className: "bg-green-100 text-green-600 border-green-300",
  },
};
