import { Meta, StoryObj } from "@storybook/react";
import BoardComment from "@/app/components/card/board/BoardComment";

const meta = {
  title: "Design System/Components/Card/CardList/BoardComment",
  component: BoardComment,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BoardComment>;

export default meta;

type Story = StoryObj<typeof BoardComment>;

export const Default: Story = {
  args: {
    id: "123",
    postId: "456",
    postTitle: "알바 추천해주세요",
    postContent:
      "알바 추천해주세요알바 추천해주세요알바 추천해주세요알바 추천해주세요알바 추천해주세요알바 추천해주세요",
    comment: "까페 알바 추천이요",
    updatedAt: new Date(),
    isAuthor: true,
  },
};
