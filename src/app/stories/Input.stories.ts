import BaseInput from "../components/input/BaseInput";

export default {
  title: "Test/Input",
  component: BaseInput,
  args: {
    name: "input",
    variant: "white",
    disabled: false,
    placeholder: "텍스트 입력",
  },
};

export const Text = {
  args: {
    type: "text",
    placeholder: "텍스트 입력",
  },
};
export const Password = {
  args: {
    type: "password",
  },
};
