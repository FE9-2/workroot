import { Meta, StoryObj } from "@storybook/react";
import { BaseInputProps } from "@/types/textInput";
import BaseInput from "@/app/components/input/text/BaseInput";

type StoryProps = BaseInputProps & {
  _storySize?: "mobile" | "desktop";
};

const meta = {
  title: "Design System/Components/TextInput/TextInput",
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
    _storySize: {
      control: "radio",
      options: ["mobile", "desktop"],
      description: "입력창 크기 설정",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<StoryProps>;

export default meta;

const storySizeMap = {
  mobile: "w-[327px] h-[54px]",
  desktop: "lg:w-[640px] lg:h-[64px]",
};

type Story = StoryObj<typeof BaseInput>;
export const Default_Hover_Focus: Story = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
  },
  Render: (args) => {
    const { _storySize, ...rest } = args as StoryProps;
    const sizeClass = _storySize ? storySizeMap[_storySize] : "";

    const StoryComponent = () => <BaseInput {...rest} size={sizeClass} />;

    return (
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm text-grayscale-500">기본 상태:</p>
          <StoryComponent />
        </div>
        <div>
          <p className="mb-2 text-sm text-grayscale-500">Hover 상태:</p>
          <div className="[&>div>div]:border-grayscale-200 [&>div>div]:bg-background-300">
            <StoryComponent />
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-grayscale-500">Focus 상태:</p>
          <div className="[&>div>div]:border-primary-orange-300">
            <StoryComponent />
          </div>
        </div>
      </div>
    );
  },
};

export const Error: Story = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
    errormessage: "에러 메시지",
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
