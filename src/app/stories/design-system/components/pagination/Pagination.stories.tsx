import "react-datepicker/dist/react-datepicker.css";
import { Meta, StoryObj } from "@storybook/react";
import Pagination from "@/app/components/pagination/Pagination";

const meta = {
  title: "Design System/Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "윈도우 너비에 따라 최대 페이지네이션 개수가 달라집니다. (mobile : 3 , desktop: 5)",
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const DefaultPagination: Story = {
  args: {
    totalPage: 8,
  },
  argTypes: {
    totalPage: { control: "range" },
  },
};
