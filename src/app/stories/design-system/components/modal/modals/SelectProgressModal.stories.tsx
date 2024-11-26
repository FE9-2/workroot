import SelectProgressModal from "@/app/components/modal/modals/confirm/SelectProgressModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SelectProgressModal> = {
  title: "Design System/Components/Modal/Modals/SelectProgressModal",
  component: SelectProgressModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SelectProgressModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "진행 상태 변경",
    message: "진행 상태를 변경하시겠습니까?",
    onConfirm: () => console.log("상태 변경 확인"),
    onCancel: () => console.log("상태 변경 취소"),
    onClose: () => console.log("모달 닫기"),
  },
};
