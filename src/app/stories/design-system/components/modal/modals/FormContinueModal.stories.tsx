import FormContinueModal from "@/app/components/modal/modals/alert/FormContinueModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FormContinueModal> = {
  title: "Design System/Components/Modal/Modals/FormContinueModal",
  component: FormContinueModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof FormContinueModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("모달 닫기"),
  },
};
