import { Meta, StoryObj } from "@storybook/react";
import ApplicationStatusCard from "@/app/components/card/cardList/ApplicationStatusCard";
import { FormListType } from "@/types/response/form";

const meta: Meta<typeof ApplicationStatusCard> = {
  title: "Design System/Components/Card/CardList/ApplicationStatusCard",
  component: ApplicationStatusCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationStatusCard>;

const mockFormData: FormListType = {
  updatedAt: new Date(),
  createdAt: new Date(),
  isPublic: true,
  scrapCount: 5,
  applyCount: 10,
  imageUrls: ["url1", "url2"],
  recruitmentEndDate: new Date(),
  recruitmentStartDate: new Date(),
  title: "모집 제목",
  id: 1,
};

export const Default: Story = {
  args: {
    formData: mockFormData,
  },
};
