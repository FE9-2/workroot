import type { Meta, StoryObj } from "@storybook/react";
import BoardComment from "@/app/components/card/board/BoardComment";

const meta: Meta<typeof BoardComment> = {
  title: "Design System/Components/Card/Board/BoardComment",
  component: BoardComment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BoardComment>;

export const Default: Story = {
  args: {
    title: "스터디카페 알바 지원합니다",
    content: "안녕하세요. 스터디카페 알바에 지원하고 싶습니다. 주말 근무 가능하며, 성실하게 일하겠습니다.",
    comments: "답변 대기중",
    date: "2024.03.21",
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
    title: "스터디카페 주말 알바 문의드립니다",
    content:
      "안녕하세요. 스터디카페 알바에 지원하고 싶어서 문의드립니다. 현재 대학생이며 주말에 일할 수 있는 알바를 찾고 있습니다. 근무 시간과 급여는 어떻게 되나요?",
    comments: "답변 완료",
  },
};
