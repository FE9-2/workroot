import ModalLayout from "@/app/components/modal/ModalLayout";
import useModalStore from "@/store/modalStore";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ModalLayout> = {
  title: "Design System/Components/Modal/ModalLayout",
  component: ModalLayout,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ModalLayout>;

const ModalTester = () => {
  const { openModal } = useModalStore();

  const modalButtons = [
    {
      label: "내 지원 내역",
      type: "detail",
      onClick: () =>
        openModal("applicationDetail", {
          formId: "123",
          title: "지원서 상세",
          applicationDate: "2024-03-21 14:30",
          applicationStatus: "서류 검토중",
          name: "홍길동",
          phone: "010-1234-5678",
          password: "••••••••",
        }),
    },
    {
      label: "이어쓰기",
      type: "alert",
      onClick: () =>
        openModal("formContinue", {
          title: "작성 중인 지원서",
          message: "이어서 작성하시겠습니까?",
          buttonText: "이어서 작성하기",
          onButtonClick: () => console.log("이어서 작성하기 클릭"),
        }),
    },
    {
      label: "모집 마감",
      type: "alert",
      onClick: () =>
        openModal("recruitmentClosed", {
          title: "모집 완료",
          message: "해당 공고는 모집이 완료되었습니다.",
          buttonText: "확인",
          onButtonClick: () => console.log("확인 클릭"),
        }),
    },
    {
      label: "알바폼 삭제",
      type: "confirm",
      onClick: () =>
        openModal("deleteForm", {
          Id: "123",
          isOpen: true,
          title: "알바폼 삭제할까요?",
          message: "삭제 후 정보를 복구할 수 없어요.",
          onConfirm: () => console.log("삭제 확인"),
          onCancel: () => console.log("삭제 취소"),
        }),
    },
    {
      label: "진행상태 선택",
      type: "confirm",
      onClick: () =>
        openModal("selectProgress", {
          Id: "123",
          isOpen: true,
          title: "진행상태 선택",
          message: "현재 진행상태를 알려주세요.",
          onConfirm: () => console.log("상태 변경 확인"),
          onCancel: () => console.log("상태 변경 취소"),
        }),
    },
    {
      label: "비밀번호 변경",
      type: "form",
      onClick: () =>
        openModal("changePassword", {
          fields: ["현재 비밀번호", "새 비밀번호", "새 비밀번호 확인"],
          onSubmit: (data) => console.log("비밀번호 변경:", data),
        }),
    },
    {
      label: "내 정보 수정",
      type: "form",
      onClick: () =>
        openModal("editMyProfile", {
          fields: ["이름", "이메일", "전화번호"],
          onSubmit: (data) => console.log("내 정보 수정:", data),
        }),
    },
    {
      label: "사장님 정보 관리",
      type: "form",
      onClick: () =>
        openModal("editOwnerProfile", {
          fields: ["상호명", "대표자명", "사업자등록번호"],
          onSubmit: (data) => console.log("사장님 정보 관리:", data),
        }),
    },
  ];

  const buttonStyles = {
    detail: "bg-primary-blue-200 hover:bg-primary-blue-300",
    alert: "bg-primary-orange-200 hover:bg-primary-orange-300",
    confirm: "bg-state-error hover:bg-state-error/90",
    form: "bg-primary-blue-100 hover:bg-primary-blue-200",
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-background-100 p-8 shadow-lg">
      <div className="mb-8 space-y-4">
        <h2 className="text-xl font-bold text-black-400">모달 테스트</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {modalButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`rounded-md px-4 py-2 text-sm text-white transition-colors ${
                buttonStyles[button.type as keyof typeof buttonStyles]
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      <ModalLayout />
    </div>
  );
};

export const ModalTest: Story = {
  render: () => (
    <div className="min-h-[600px] bg-background-200 p-4">
      <ModalTester />
    </div>
  ),
};
