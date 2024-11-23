import BaseInput from "../components/input/BaseInput";

export default {
  title: "Design System/TextInput",
  component: BaseInput,
  args: {
    name: "input",
    variant: "white",
    disabled: false,
    placeholder: "텍스트 입력",
  },
  argTypes: {
    variant: { control: "radio", options: ["white", "transparent"], defaultValue: "white" },
  },
};

export const WhiteTextInput = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
  },
};

export const TransparentTextInput = {
  args: {
    type: "text",
    variant: "transparent",
    placeholder: "텍스트 입력",
  },
};

export const WhitePasswordInput = {
  args: {
    type: "password",
    variant: "white",
    placeholder: "텍스트 입력",
  },
};

export const TransparentPasswordInput = {
  args: {
    type: "password",
    variant: "transparent",
    placeholder: "텍스트 입력",
  },
};

export const TextInput_with_error = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
    errorMessage: "에러 메시지",
  },
};

export const TextInput_with_feedback = {
  args: {
    type: "text",
    variant: "white",
    placeholder: "텍스트 입력",
    feedbackMessage: "피드백 메시지",
  },
};
