import BaseInput from "@/app/components/input/BaseInput";
import { Meta, StoryObj } from "@storybook/react";
const meta = {
  title: "Design System/Components/Input",
  component: BaseInput,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["white", "transparent"],
    },
    type: {
      control: "radio",
      options: ["text", "password"],
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof BaseInput>;

export default meta;

type Story = StoryObj<typeof BaseInput>;
export const Default_Hover_Focus: Story = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
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
          <div className="[&>div>div]:border-gray-200 [&>div>div]:bg-background-300">
            <Story />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-gray-500">Focus 상태:</p>
          <div className="[&>div>div]:border-primary-orange-300">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
};

export const Error: Story = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
    errorMessage: "에러 메시지",
  },
};

export const Feedback: Story = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
    feedbackMessage: "피드백 메시지",
  },
};
