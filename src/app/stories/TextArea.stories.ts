import BaseTextArea from "@/app/components/input/BaseTextArea";

enum BorderColor {
  ERROR = "border-state-error",
}

export default {
  title: "Test/TextArea",
  component: BaseTextArea,
  args: {
    placeholder:
      "값을 입력해보세요. hover, focus 테스트를 해보세요. 브라우저 창 크기를 줄이면 반응형 디자인을 확인할 수 있습니다.",
    disabled: false,
  },
  argTypes: {
    variant: { control: "radio", options: ["white", "transparent"], defaultValue: "white" },
  },
};
export const whiteTextArea = {
  args: {
    variant: "white",
  },
};

export const transparentTextArea = {
  args: {
    variant: "transparent",
  },
};

export const textArea_with_error = {
  args: {
    variant: "white",
    borderColor: BorderColor.ERROR,
    placeholder: "에러 상태 테스트",
    errorMessage: "가게 이름(상호명)을 필수로 입력해주세요", // 필수값 검증
  },
};
