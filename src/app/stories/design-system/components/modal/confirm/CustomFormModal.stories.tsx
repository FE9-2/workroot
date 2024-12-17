import CustomFormModal from "@/app/components/modal/modals/confirm/CustomFormModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CustomFormModal> = {
  title: "Design System/Components/Modal/Modals/CustomFormModal",
  component: CustomFormModal,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    content: { control: "text" },
    confirmText: { control: "text" },
    cancelText: { control: "text" },
    isOpen: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof CustomFormModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "작업을 진행하시겠습니까?",
    content: "이 작업은 되돌릴 수 없습니다.",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: () => console.log("확인 클릭"),
    onCancel: () => console.log("취소 클릭"),
    className: "",
  },
};

export const Processing: Story = {
  args: {
    ...Default.args,
  },
};

export const CustomText: Story = {
  args: {
    ...Default.args,
    title: "회원 탈퇴",
    content: "정말로 탈퇴하시겠습니까?",
    confirmText: "탈퇴하기",
    cancelText: "다시 생각해볼게요",
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    title: "중요 안내",
    content: "이 작업은 시스템에 큰 영향을 미칠 수 있습니다. 신중하게 결정해주시기 바랍니다. 계속 진행하시겠습니까?",
    confirmText: "계속 진행",
    cancelText: "돌아가기",
  },
};

export const SignupTypeSelection: Story = {
  args: {
    ...Default.args,
    title: "회원 유형 선택",
    content: "가입하실 회원 유형을 선택해주세요.",
    confirmText: "지원자로 가입",
    cancelText: "사장님으로 가입",
  },
};

export const SignupCompletion: Story = {
  args: {
    ...Default.args,
    title: "회원가입 완료",
    content: "회원가입이 완료되었습니다. 메인 페이지로 이동하시겠습니까?",
    confirmText: "메인으로 이동",
    cancelText: "로그인 페이지로 이동",
  },
};

export const ApplicationSubmit: Story = {
  args: {
    ...Default.args,
    title: "지원서 제출",
    content: "작성하신 지원서를 제출하시겠습니까? 제출 후에는 수정이 불가능합니다.",
    confirmText: "제출하기",
    cancelText: "다시 검토하기",
  },
};

export const StoreRegistration: Story = {
  args: {
    ...Default.args,
    title: "가게 등록",
    content: "입력하신 정보로 가게를 등록하시겠습니까? 등록 후 수정이 가능합니다.",
    confirmText: "가게 등록하기",
    cancelText: "정보 수정하기",
  },
};
