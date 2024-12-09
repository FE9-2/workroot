import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Decorator } from "@storybook/react";
import { useRouter } from "next/navigation";

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

const withProviders: Decorator = (Story) => {
  return (
    <MockNextRouter>
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    </MockNextRouter>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withProviders],
};

export default preview;
