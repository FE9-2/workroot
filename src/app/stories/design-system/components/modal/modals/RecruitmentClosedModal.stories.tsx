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
    title: "모집 완료",
    message: "해당 공고는 모집이 완료되었습니다.",
    buttonText: "확인",
    onButtonClick: () => console.log("확인 클릭"),
    onClose: () => console.log("모달 닫기"),
  },
};
