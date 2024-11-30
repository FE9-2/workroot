import { Meta, StoryObj } from "@storybook/react";
import { BaseTextAreaProps } from "@/types/textInput";
import BaseTextArea from "@/app/components/input/textarea/BaseTextArea";

type StoryProps = BaseTextAreaProps & {
  _storySize?: "mobile" | "desktop";
};
const meta = {
  title: "Design System/Components/TextInput/TextArea",
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
    _storySize: {
      control: "radio",
      options: ["mobile", "desktop"],
      description: "스토리북 전용 사이즈 옵션",
    },
  },
} satisfies Meta<StoryProps>;

export default meta;
// 스토리북 전용 사이즈 매핑
const storySizeMap = {
  mobile: "w-[327px] h-[132px]",
  desktop: "lg:w-[640px] lg:h-[160px]",
};

type Story = StoryObj<typeof BaseTextArea>;

export const Default_Hover_Focus: Story = {
  args: {
    variant: "white",
  },
  render: (args) => {
    const { _storySize, ...rest } = args as StoryProps;
    const sizeClass = _storySize ? storySizeMap[_storySize] : undefined;

    const StoryComponent = () => <BaseTextArea {...rest} size={sizeClass} />;

    return (
      <div className="space-y-4">
        <div>
          <p className="text-grayscale-500 mb-2 text-sm">기본 상태:</p>
          <StoryComponent />
        </div>
        <div>
          <p className="text-grayscale-500 mb-2 text-sm">Hover 상태:</p>
          <div className="[&>div]:bg-background200 [&>div]:border-grayscale-200">
            <StoryComponent />
          </div>
        </div>
        <div>
          <p className="text-grayscale-500 mb-2 text-sm">Focus 상태:</p>
          <div className="[&>div]:border-grayscale-400">
            <StoryComponent />
          </div>
        </div>
      </div>
    );
  },
};

export const textArea_with_error: Story = {
  args: {
    variant: "white",
    placeholder: "에러 상태 테스트",
    errorMessage: "가게 이름(상호명)을 필수로 입력해주세요",
  },
  render: (args) => {
    const { _storySize, ...rest } = args as StoryProps;
    const sizeClass = _storySize ? storySizeMap[_storySize] : undefined;

    const StoryComponent = () => <BaseTextArea {...rest} size={sizeClass} />;

    return <StoryComponent />;
  },
};
