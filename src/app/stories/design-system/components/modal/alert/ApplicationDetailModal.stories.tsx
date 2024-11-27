import ApplicationDetailModal from "@/app/components/modal/modals/alert/ApplicationDetailModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ApplicationDetailModal> = {
  title: "Design System/Components/Modal/Modals/ApplicationDetailModal",
  component: ApplicationDetailModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationDetailModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    formId: "123",
    applicationDate: "2024-03-21 14:30",
    applicationStatus: "서류 검토중",
    name: "홍길동",
    phone: "010-1234-5678",
    password: "••••••••",
    onClose: () => console.log("모달 닫기"),
  },
};
