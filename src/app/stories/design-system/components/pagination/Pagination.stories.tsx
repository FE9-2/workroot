import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import Pagination from "@/app/components/pagination/Pagination";

const meta = {
  title: "Design System/Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const DefaultPagination: Story = {
  args: {
    totalPage: 3,
  },
  argTypes: {
    totalPage: { control: "number" },
  },
};
