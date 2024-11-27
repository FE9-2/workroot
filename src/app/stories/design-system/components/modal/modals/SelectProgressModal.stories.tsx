import SelectProgressModal from "@/app/components/modal/modals/confirm/SelectProgressModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SelectProgressModal> = {
  title: "Design System/Components/Modal/Modals/SelectProgressModal",
  component: SelectProgressModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof SelectProgressModal>;

export const Default: Story = {
  args: {
    onClose: () => console.log("모달 닫기"),
  },
};
