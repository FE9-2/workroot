import { Meta, StoryObj } from "@storybook/react";
import RecruitDetail from "@/app/components/card/cardList/RecruitDetail";
import { FormDetailResponse } from "@/types/response/form";

const meta: Meta<typeof RecruitDetail> = {
  title: "Design System/Components/Card/CardList/RecruitDetail",
  component: RecruitDetail,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RecruitDetail>;

const mockRecruitData: FormDetailResponse = {
  updatedAt: "2024-12-11T04:43:46.052Z",
  createdAt: "2024-12-11T04:43:46.052Z",
  preferred: "string",
  age: "string",
  education: "string",
  gender: "string",
  numberOfPositions: 1,
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
  description: "모집 설명",
  title: "모집 제목",
  ownerId: 1,
  id: 1,
  scrapCount: 0,
  applyCount: 0,
  isScrapped: false,
  phoneNumber: "010-1234-5678",
  storePhoneNumber: "02-123-4567",
  storeName: "가게 이름",
};

export const Default: Story = {
  args: {
    recruitData: mockRecruitData,
  },
};
