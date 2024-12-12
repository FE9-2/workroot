import type { Meta, StoryObj } from "@storybook/react";
import Comment from "@/app/components/card/board/Comment";

const meta: Meta<typeof Comment> = {
  title: "Design System/Components/Card/Board/Comment",
  component: Comment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    userName: "홍길동",
    date: "2024.03.21",
    comment: "안녕하세요. 지원하고 싶어서 문의드립니다. 현재 근무 중이신 분들은 몇 분이나 계신가요?",
    onKebabClick: () => console.log("케밥 메뉴 클릭"),
  },
};

export const LongComment: Story = {
  args: {
    userName: "김철수",
    date: "2024.03.22",
    comment:
      "안녕하세요. 문의드립니다. 현재 근무 중이신 분들은 몇 분이나 계신가요? 그리고 주말 근무는 어떻게 되나요? 야간 근무도 있나요? 자세한 설명 부탁드립니다.",
    onKebabClick: () => console.log("케밥 메뉴 클릭"),
  },
};
