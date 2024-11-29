import { Meta, StoryObj } from "@storybook/react";
import RecruitCond from "@/app/components/card/cardList/RecruitCond";
import { FormDetailResponse } from "@/types/response/form";

const meta: Meta<typeof RecruitCond> = {
  title: "Design System/Components/Card/CardList/RecruitCond",
  component: RecruitCond,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RecruitCond>;

const mockRecruitData: FormDetailResponse = {
  updatedAt: new Date(),
  createdAt: new Date(),
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
  workEndDate: new Date(),
  workStartDate: new Date(),
  location: "서울",
  imageUrls: ["url1", "url2"],
  recruitmentEndDate: new Date(),
  recruitmentStartDate: new Date(),
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
