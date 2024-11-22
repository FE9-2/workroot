import TransparentTextArea from "@/app/components/input/TransparentTextArea";

enum BgColor {
  WHITE = "bg-background-200",
  TRANSPARENT = "bg-transparent border-[0.5px]",
}

enum BorderColor {
  DEFAULT = "border-grayscale-200",
  NONE = "border-0",
  ERROR = "border-state-error",
}

export default {
  title: "Test/TransparentTextArea",
  component: TransparentTextArea,
  args: {
    placeholder: "입력하세요",
    disabled: false,
  },
};
export const defalut = {};

export const textArea_error = {
  args: {
    borderColor: BorderColor.ERROR,
    errorMessage: "가게 이름(상호명)을 필수로 입력해주세요", // 필수값 검증
  },
};
