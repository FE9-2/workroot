import FormContinueModal from "@/app/components/modal/modals/alert/FormContinueModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FormContinueModal> = {
  title: "Design System/Components/Modal/Modals/FormContinueModal",
  component: FormContinueModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FormContinueModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "작성 중인 지원서",
    message: "이어서 작성하시겠습니까?",
    buttonText: "이어서 작성하기",
    onButtonClick: () => console.log("이어서 작성하기 클릭"),
    onClose: () => console.log("모달 닫기"),
  },
};
