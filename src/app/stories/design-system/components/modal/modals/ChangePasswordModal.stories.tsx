import ChangePasswordModal from "@/app/components/modal/modals/form/ChangePasswordModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ChangePasswordModal> = {
  title: "Design System/Components/Modal/Modals/ChangePasswordModal",
  component: ChangePasswordModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ChangePasswordModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    fields: ["현재 비밀번호", "새 비밀번호", "새 비밀번호 확인"],
    onSubmit: (data) => console.log("비밀번호 변경:", data),
    onClose: () => console.log("모달 닫기"),
  },
};
