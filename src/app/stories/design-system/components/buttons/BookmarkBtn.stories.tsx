import BookmarkBtn from "@/app/components/button/default/BookmarkBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BookmarkBtn> = {
  title: "Design System/Components/Button/BookmarkBtn",
  component: BookmarkBtn,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof BookmarkBtn>;

export const Bookmarked: Story = {
  args: {},
  Render: (args) => {
    return (
      <div>
        <BookmarkBtn {...args} />
      </div>
    );
  },
};
