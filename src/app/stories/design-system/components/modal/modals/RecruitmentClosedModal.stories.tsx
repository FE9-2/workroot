import RecruitmentClosedModal from "@/app/components/modal/modals/alert/RecruitmentClosedModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RecruitmentClosedModal> = {
  title: "Design System/Components/Modal/Modals/RecruitmentClosedModal",
  component: RecruitmentClosedModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RecruitmentClosedModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("모달 닫기"),
  },
};
