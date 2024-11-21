import CommonInput from "@/app/components/input/CommonInput";

export default {
  title: "Test/Input",
  component: CommonInput,
  args: {
    color: "#d9d9d9",
  },
};

export const Text = {
  args: {
    type: "text",
  },
};
export const Password = {
  args: {
    type: "password",
  },
};
