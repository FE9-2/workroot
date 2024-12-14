import DeleteFormModal from "@/app/components/modal/modals/confirm/DeleteFormModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DeleteFormModal> = {
  title: "Design System/Components/Modal/Modals/DeleteFormModal",
  component: DeleteFormModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DeleteFormModal>;

export const Default: Story = {
  args: {
    id: "123",
    isOpen: true,
    onClose: () => console.log("모달 닫기"),
    onConfirm: () => console.log("삭제 확인"),
    className: "",
  },
};
