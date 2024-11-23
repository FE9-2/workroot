import BaseTextArea from "@/app/components/textarea/BaseTextArea";
import { Meta, StoryObj } from "@storybook/react";
enum BorderColor {
  ERROR = "border-state-error",
}

const meta = {
  title: "Design System/Components/TextArea",
  component: BaseTextArea,
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder:
      "값을 입력해보세요. hover, focus 테스트를 해보세요. 브라우저 창 크기를 줄이면 반응형 디자인을 확인할 수 있습니다.",
    disabled: false,
  },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["white", "transparent"], defaultValue: "white" },
  },
} satisfies Meta<typeof BaseTextArea>;

export default meta;

type Story = StoryObj<typeof BaseTextArea>;

export const whiteTextArea: Story = {
  args: {
    variant: "white",
  },
  decorators: [
    (Story: any) => (
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-gray-500">기본 상태:</p>
          <Story />
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Hover 상태:</p>
          <div className="[&>div]:bg-background200 [&>div]:border-gray-200">
            <Story />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Focus 상태:</p>
          <div className="[&>div]:border-gray-400">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};
export const transparentTextArea: Story = {
  args: {
    variant: "transparent",
  },
  decorators: [
    (Story: any) => (
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-gray-500">기본 상태:</p>
          <Story />
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Hover 상태:</p>
          <div className="[&>div]:bg-background200 [&>div]:border-gray-300">
            <Story />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Focus 상태:</p>
          <div className="[&>div]:border-gray-400">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const textArea_with_error: Story = {
  args: {
    variant: "white",
    placeholder: "에러 상태 테스트",
    errorMessage: "가게 이름(상호명)을 필수로 입력해주세요",
  },
};
