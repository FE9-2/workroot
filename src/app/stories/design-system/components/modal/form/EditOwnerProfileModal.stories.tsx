import EditOwnerProfileModal from "@/app/components/modal/modals/form/EditOwnerProfileModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof EditOwnerProfileModal> = {
  title: "Design System/Components/Modal/Modals/EditOwnerProfileModal",
  component: EditOwnerProfileModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EditOwnerProfileModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("모달 닫기"),
  },
};
