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
    currentPage: 1,
    onPageChange: (page: number) => console.log(`페이지 ${page}로 이동`),
  },
  argTypes: {
    totalPage: {
      control: { type: "number", min: 1, max: 100 },
      description: "전체 페이지 수",
    },
    currentPage: {
      control: { type: "number", min: 1 },
      description: "현재 페이지",
    },
    onPageChange: {
      action: "clicked",
      description: "페이지 변경 핸들러",
    },
  },
};
