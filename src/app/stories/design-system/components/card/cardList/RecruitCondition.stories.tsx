import { Meta, StoryObj } from "@storybook/react";
import { FormDetailResponse } from "@/types/response/form";
import RecruitCondition from "@/app/components/card/cardList/RecruitCondition";

const meta: Meta<typeof RecruitCondition> = {
  title: "Design System/Components/Card/CardList/RecruitCondition",
  component: RecruitCondition,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RecruitCondition>;

const mockRecruitData: FormDetailResponse = {
  updatedAt: "2024-12-11T04:43:46.052Z",
  createdAt: "2024-12-11T04:43:46.052Z",
  preferred: "업무 관련 자격증 소지, 유사업무 경험 우대, 인근 거주 우대",
  age: "20세 이상",
  education: "고등학교 졸업",
  gender: "무관",
  numberOfPositions: 3,
  isPublic: true,
  hourlyWage: 10000,
  isNegotiableWorkDays: true,
  workDays: ["월요일", "화요일"],
  workEndTime: "18:00",
  workStartTime: "09:00",
  workEndDate: "2024-12-11T04:43:46.052Z",
  workStartDate: "2024-12-11T04:43:46.052Z",
  location: "서울",
  imageUrls: ["url1", "url2"],
  recruitmentEndDate: "2024-12-11T04:43:46.052Z",
  recruitmentStartDate: "2024-12-11T04:43:46.052Z",
  description: "모집설명",
  title: "모집제목",
  ownerId: 1,
  id: 1,
  scrapCount: 0,
  applyCount: 0,
  isScrapped: false,
  phoneNumber: "010-1234-5678",
  storePhoneNumber: "02-123-4567",
  storeName: "가게이름",
};

export const Default: Story = {
  args: {
    recruitData: mockRecruitData,
  },
};
