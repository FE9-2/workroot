import type { Meta, StoryObj } from "@storybook/react";
import CardBoard from "@/app/components/card/board/CardBoard";

const meta: Meta<typeof CardBoard> = {
  title: "Design System/Components/Card/Board/CardBoard",
  component: CardBoard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CardBoard>;

export const Default: Story = {
  args: {
    title: "스터디카페 주말 알바 구합니다",
    content: "주말에 스터디카페에서 일하실 분을 구합니다. 시급은 협의 가능하며, 성실하신 분을 찾고 있습니다.",
    nickname: "홍길동",
    updatedAt: new Date("2024-03-21"),
    commentCount: 5,
    likeCount: 3,
    variant: "default",
    onKebabClick: () => console.log("케밥 메뉴 클릭"),
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: "primary",
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: "스터디카페에서 함께 일하실 분을 모집합니다 (주말/평일)",
    content:
      "안녕하세요. 강남역 근처 스터디카페에서 함께 일하실 분을 모집합니다. 주말 및 평일 근무 가능하신 분을 찾고 있으며, 근무 시간은 협의 가능합니다. 경력자 우대하며 초보자도 지원 가능합니다.",
  },
};
