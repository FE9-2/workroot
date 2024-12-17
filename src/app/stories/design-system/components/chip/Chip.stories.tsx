import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import Chip from "@/app/components/chip/Chip";

const meta = {
  title: "Design System/Components/Chip/DefaultChip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof Chip>;

export const DefaultChip: Story = {
  args: {
    label: "스크랩",
    variant: "positive",
  },
};
