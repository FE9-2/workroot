import { Meta, StoryObj } from "@storybook/react";
import { FormListType } from "@/types/response/form";
import CardChipIcon from "@/app/components/card/cardList/CardChipIcon";

const meta: Meta<typeof CardChipIcon> = {
  title: "Design System/Components/Card/CardList/CardChipIcon",
  component: CardChipIcon,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CardChipIcon>;

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
