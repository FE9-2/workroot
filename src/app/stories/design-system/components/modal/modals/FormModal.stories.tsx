import FormModal from "@/app/components/modal/modals/FormModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FormModal> = {
  title: "Design System/Components/Modal/Modals/FormModal",
  component: FormModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FormModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    fields: ["이름", "이메일", "전화번호"],
    onSubmit: (data) => console.log("제출된 데이터:", data),
    onClose: () => console.log("모달 닫기"),
  },
  render: (args) => {
    return (
      <div>
        <p className="mb-2 text-sm">폼 모달</p>
        <FormModal {...args} />
      </div>
    );
  },
};
