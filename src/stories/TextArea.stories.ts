import CommomTextArea from "@/app/components/input/CommomTextArea";

enum TextAreaSize {
  SMALL = "w-[327px] h-[124px]",
  LARGE = "w-[640px] h-[196px]",
}

enum BgColor {
  WHITE = "bg-white",
  TRANSPARENT = "bg-transparent",
}

enum BorderColor {
  DEFAULT = "border-gray-200",
  HOVER = "border-gray-300",
  FOCUS = "border-primary-orange-300",
  ERROR = "border-state-error",
}

enum TextColor {
  GRAY = "text-gray-400",
  BLACK = "text-black-400",
}

export default {
  title: "Test/TextArea",
  component: CommomTextArea,
  args: {
    placeholder: "입력하세요",
    disabled: false,
    borderWidth: "border-[0.5px]",
    borderColor: BorderColor.DEFAULT,
    textColor: TextColor.GRAY,
    size: TextAreaSize.SMALL,
    bgColor: BgColor.TRANSPARENT,
  },
};

export const textArea_default = {};

export const textArea_error = {
  args: {
    borderColor: BorderColor.ERROR,
    textColor: TextColor.BLACK,
    errorAlign: "text-right",
    errorMessage: "가게 이름(상호명)을 필수로 입력해주세요", // 필수값 검증
  },
};
