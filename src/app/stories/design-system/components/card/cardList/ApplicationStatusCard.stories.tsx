import { Meta, StoryObj } from "@storybook/react";
import ApplicationStatusCard from "@/app/components/card/cardList/ApplicationStatusCard";
import { ApplicationResponse } from "@/types/response/application";

const meta: Meta<typeof ApplicationStatusCard> = {
  title: "Design System/Components/Card/CardList/ApplicationStatusCard",
  component: ApplicationStatusCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationStatusCard>;

const mockApplications: ApplicationResponse[] = [
  {
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
  },
  {
    applicantId: 2,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "interview",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서2.pdf",
    resumeId: 124,
    experienceMonths: 6,
    phoneNumber: "010-9876-5432",
    name: "김철수",
    id: 2,
  },
  {
    applicantId: 3,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "hired",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서3.pdf",
    resumeId: 125,
    experienceMonths: 24,
    phoneNumber: "010-1111-2222",
    name: "이영희",
    id: 3,
  },
  {
    applicantId: 4,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "rejected",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서4.pdf",
    resumeId: 126,
    experienceMonths: 3,
    phoneNumber: "010-2222-3333",
    name: "박지민",
    id: 4,
  },
  {
    applicantId: 5,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "submitted",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서5.pdf",
    resumeId: 127,
    experienceMonths: 18,
    phoneNumber: "010-4444-5555",
    name: "최민수",
    id: 5,
  },
  {
    applicantId: 6,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "interview",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서6.pdf",
    resumeId: 128,
    experienceMonths: 8,
    phoneNumber: "010-6666-7777",
    name: "이수진",
    id: 6,
  },
  {
    applicantId: 7,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "hired",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서7.pdf",
    resumeId: 129,
    experienceMonths: 15,
    phoneNumber: "010-8888-9999",
    name: "김하늘",
    id: 7,
  },
  {
    applicantId: 8,
    updatedAt: new Date(),
    createdAt: new Date(),
    status: "rejected",
    introduction: "안녕하세요, 저는 지원자입니다.",
    resumeName: "이력서8.pdf",
    resumeId: 130,
    experienceMonths: 1,
    phoneNumber: "010-0000-1111",
    name: "이정민",
    id: 8,
  },
];

export const Default: Story = {
  args: {
    applications: mockApplications,
  },
};
