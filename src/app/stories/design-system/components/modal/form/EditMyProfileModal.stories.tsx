import EditMyProfileModal from "@/app/components/modal/modals/form/EditMyProfileModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EditMyProfileModal> = {
  title: "Design System/Components/Modal/Modals/EditMyProfileModal",
  component: EditMyProfileModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EditMyProfileModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("모달 닫기"),
  },
};
