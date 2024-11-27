import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Decorator } from "@storybook/react";

const queryClient = new QueryClient();

const withQueryClient: Decorator = (Story) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
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
  decorators: [withQueryClient],
};

export default preview;
