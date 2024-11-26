import ConfirmModal from "@/app/components/modal/modals/ConfirmModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ConfirmModal> = {
  title: "Design System/Components/Modal/Modals/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "확인",
    message: "정말 삭제하시겠습니까?",
    onConfirm: () => console.log("확인"),
    onCancel: () => console.log("취소"),
    onClose: () => console.log("모달 닫기"),
  },
  render: (args) => {
    return (
      <div>
        <p className="mb-2 text-sm">확인 모달</p>
        <ConfirmModal {...args} />
      </div>
    );
  },
};
