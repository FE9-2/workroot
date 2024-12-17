import type { Meta, StoryObj } from "@storybook/react";
import Comment from "@/app/components/card/board/Comment";

const meta: Meta<typeof Comment> = {
  title: "Design System/Components/Card/Board/Comment",
  component: Comment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[327px] lg:w-[477px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    id: "1",
    nickname: "홍길동",
    updatedAt: new Date("2024.03.21"),
    content: "안녕하세요. 지원하고 싶어서 문의드립니다. 현재 근무 중이신 분들은 몇 분이나 계신가요?",
    isAuthor: false,
  },
};

export const AuthorComment: Story = {
  args: {
    id: "2",
    nickname: "홍길동",
    updatedAt: new Date("2024.03.21"),
    content: "안녕하세요. 지원하고 싶어서 문의드립니다. 현재 근무 중이신 분들은 몇 분이나 계신가요?",
    isAuthor: true,
  },
};

export const LongComment: Story = {
  args: {
    id: "3",
    nickname: "김철수",
    updatedAt: new Date("2024.03.22"),
    content:
      "안녕하세요. 문의드립니다. 현재 근무 중이신 분들은 몇 분이나 계신가요? 그리고 주말 근무는 어떻게 되나요? 야간 근무도 있나요? 자세한 설명 부탁드립니다.",
    isAuthor: false,
  },
};

export const LongAuthorComment: Story = {
  args: {
    id: "4",
    nickname: "김철수",
    updatedAt: new Date("2024.03.22"),
    content:
      "안녕하세요. 문의드립니다. 현재 근무 중이신 분들은 몇 분이나 계신가요? 그리고 주말 근무는 어떻게 되나요? 야간 근무도 있나요? 자세한 설명 부탁드립니다.",
    isAuthor: true,
  },
};
