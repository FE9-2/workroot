import { Meta, StoryObj } from "@storybook/react";
import { ApplicationResponse } from "@/types/response/application";
import SubmitContCard from "@/app/components/card/cardList/SubmitContCard";

const meta: Meta<typeof SubmitContCard> = {
  title: "Design System/Components/Card/CardList/SubmitContCard",
  component: SubmitContCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SubmitContCard>;

const mockData: ApplicationResponse = {
  applicantId: 1,
  updatedAt: new Date(),
  createdAt: new Date(),
  status: "submitted",
  introduction: "안녕하세요, 저는 지원자입니다.",
  resumeName: "이력서.pdf",
  resumeId: 123,
  experienceMonths: 12,
  phoneNumber: "010-1234-5678",
  name: "홍길동",
  id: 1,
};

// Default 스토리 정의
export const Default: Story = {
  args: {
    submitContData: mockData,
  },
};
