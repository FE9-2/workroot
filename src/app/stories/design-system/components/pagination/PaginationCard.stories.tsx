import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import PaginationCard from "@/app/components/pagination/PaginationCard";

const meta = {
  title: "Design System/Components/Pagination",
  component: PaginationCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof PaginationCard>;

export default meta;

type Story = StoryObj<typeof PaginationCard>;

export const Card: Story = {
  args: {
    imageCount: 3,
    selectedId: 1,
  },
  argTypes: {
    selectedId: { control: "radio", options: [0, 1, 2] },
  },
};
