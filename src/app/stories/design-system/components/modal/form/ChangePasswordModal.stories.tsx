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
    onClose: () => console.log("모달 닫기"),
  },
};
