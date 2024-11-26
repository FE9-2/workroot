import ModalLayout from "@/app/components/modal/ModalLayout";
import useModalStore from "@/store/modalStore";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

const meta: Meta<typeof ModalLayout> = {
  title: "Design System/Components/Modal/ModalLayout",
  component: ModalLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof ModalLayout>;

const ModalTester = () => {
  const [modalType, setModalType] = useState<"alert" | "confirm" | "form">("alert");
  const { openModal } = useModalStore();

  const openAlertModal = () => {
    openModal("alert", {
      title: "테스트 알림",
      message: "이것은 테스트 알림입니다.",
      buttonText: "확인",
      onButtonClick: () => console.log("알림 모달: 버튼 클릭"),
    });
    setModalType("alert");
  };

  const openConfirmModal = () => {
    openModal("confirm", {
      title: "확인",
      message: "정말 삭제하시겠습니까?",
      onConfirm: () => console.log("확인 모달: 확인 클릭"),
      onCancel: () => console.log("확인 모달: 취소 클릭"),
    });
    setModalType("confirm");
  };

  const openFormModal = () => {
    openModal("form", {
      fields: ["이름", "이메일", "전화번호"],
      onSubmit: (data) => console.log("폼 모달: 제출된 데이터", data),
    });
    setModalType("form");
  };

  return (
    <div className="p-4">
      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-bold">모달 테스트</h2>
        <p className="text-sm text-gray-600">현재 열린 모달: {modalType}</p>
        <div className="flex gap-4">
          <button onClick={openAlertModal} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            알림 모달 열기
          </button>
          <button
            onClick={openConfirmModal}
            className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            확인 모달 열기
          </button>
          <button onClick={openFormModal} className="rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600">
            폼 모달 열기
          </button>
        </div>
      </div>
      <ModalLayout />
    </div>
  );
};

export const ModalTest: Story = {
  render: () => <ModalTester />,
};
