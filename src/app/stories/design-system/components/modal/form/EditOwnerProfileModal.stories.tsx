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
    fields: ["상호명", "대표자명", "사업자등록번호"],
    onSubmit: (data) => console.log("사업자 프로필 수정:", data),
    onClose: () => console.log("모달 닫기"),
  },
};
