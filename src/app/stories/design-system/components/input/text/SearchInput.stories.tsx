import SearchInput from "@/app/components/input/text/SearchInput";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta = {
  title: "Design System/Components/TextInput/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      description: "검색어 값",
      control: "text",
    },
    placeholder: {
      description: "플레이스홀더 텍스트",
      control: "text",
    },
    className: {
      description: "추가 스타일 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof SearchInput>;

// 상호작용을 위한 래퍼 컴포넌트
const SearchInputWithHooks = (args: Story["args"]) => {
  const [value, setValue] = useState("");
  return <SearchInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: (args) => <SearchInputWithHooks {...args} />,
};

export const WithPlaceholder: Story = {
  render: (args) => <SearchInputWithHooks {...args} />,
  args: {
    placeholder: "검색어를 입력하세요",
  },
};

export const WithCustomStyle: Story = {
  render: (args) => <SearchInputWithHooks {...args} />,
  args: {
    className: "bg-gray-100",
  },
};
