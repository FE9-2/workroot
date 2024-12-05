import ChangePasswordModal from "@/app/components/modal/modals/form/ChangePasswordModal";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// React Query 클라이언트 생성
const queryClient = new QueryClient();

// Next.js Router 모킹
const MockNextRouter = ({ children }: { children: React.ReactNode }) => {
  const mockRouter = {
    push: () => Promise.resolve(),
    refresh: () => Promise.resolve(),
    prefetch: () => Promise.resolve(),
    replace: () => Promise.resolve(),
  };

  // @ts-expect-error - 스토리북 테스트용 모킹
  useRouter.mockImplementation(() => mockRouter);

  return <>{children}</>;
};

const meta: Meta<typeof ChangePasswordModal> = {
  title: "Design System/Components/Modal/Modals/ChangePasswordModal",
  component: ChangePasswordModal,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <MockNextRouter>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </MockNextRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChangePasswordModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log("모달 닫기"),
  },
};
