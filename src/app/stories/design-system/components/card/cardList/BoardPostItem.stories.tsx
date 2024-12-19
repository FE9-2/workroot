import BoardPostItem from "@/app/components/card/board/BoardPostItem";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Design System/Components/Card/CardList/BoardPostItem",
  component: BoardPostItem,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BoardPostItem>;

export default meta;

type Story = StoryObj<typeof BoardPostItem>;
const post = {
  id: 123,
  title: "안녕하세요",
  content:
    "알바 처음해보는데 추천해주세요알바 처음해보는데 추천해주세요알바 처음해보는데 추천해주세요알바 처음해보는데 추천해주세요알바 처음해보는데 추천해주세요알바 처음해보는데 추천해주세요",
  writer: {
    id: 123,
    nickname: "판다마켓",
    imageUrl: "",
  },
  imageUrl: "",
  commentCount: 10,
  likeCount: 11,
  updatedAt: new Date(),
  createdAt: new Date(),
};
export const Default: Story = {
  args: { post },
};
