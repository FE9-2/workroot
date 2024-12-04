import { Meta, StoryObj } from "@storybook/react";
import KebabDropdown from "@/app/components/button/dropdown/KebabDropdown";

const meta: Meta<typeof KebabDropdown> = {
  title: "Design System/Components/Dropdown/KebabDropdown",
  component: KebabDropdown,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    options: {
      description: "드롭다운 메뉴 옵션들",
      control: {
        type: "object",
      },
    },
    className: {
      description: "추가적인 스타일링을 위한 클래스",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof KebabDropdown>;

// 기본 케밥 메뉴 드롭다운
export const Default: Story = {
  args: {
    options: [
      { label: "내 정보 수정", onClick: () => console.log("내 정보 수정 클릭") },
      { label: "비밀번호 변경", onClick: () => console.log("비밀번호 변경 클릭") },
    ],
  },
};

// 여러 옵션이 있는 케밥 메뉴 드롭다운
export const MultipleOptions: Story = {
  args: {
    options: [
      { label: "프로필 보기", onClick: () => console.log("프로필 보기 클릭") },
      { label: "내 정보 수정", onClick: () => console.log("내 정보 수정 클릭") },
      { label: "비밀번호 변경", onClick: () => console.log("비밀번호 변경 클릭") },
      { label: "로그아웃", onClick: () => console.log("로그아웃 클릭") },
    ],
  },
};

// 커스텀 스타일이 적용된 케밥 메뉴 드롭다운
export const CustomStyle: Story = {
  args: {
    options: [
      { label: "수정하기", onClick: () => console.log("수정하기 클릭") },
      { label: "삭제하기", onClick: () => console.log("삭제하기 클릭") },
    ],
    className: "bg-grayscale-50 p-2 rounded-full",
  },
};
