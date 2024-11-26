import AlertModal from "@/app/components/modal/modals/AlertModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AlertModal> = {
  title: "Design System/Components/Modal/Modals/AlertModal",
  component: AlertModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof AlertModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "알림",
    message: "작업이 완료되었습니다.",
    buttonText: "확인",
    onButtonClick: () => console.log("버튼 클릭"),
    onClose: () => console.log("모달 닫기"),
  },
  render: (args) => {
    return (
      <div>
        <p className="mb-2 text-sm">기본 알림 모달</p>
        <AlertModal {...args} />
      </div>
    );
  },
};

export const WithLongMessage: Story = {
  args: {
    isOpen: true,
    title: "시스템 알림",
    message: "이것은 매우 긴 메시지입니다. 모달의 레이아웃이 어떻게 조정되는지 확인하기 위한 예시입니다.",
    buttonText: "확인",
    onButtonClick: () => console.log("버튼 클릭"),
    onClose: () => console.log("모달 닫기"),
  },
};
