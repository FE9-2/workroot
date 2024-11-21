import type { Preview } from "@storybook/react";
import "../src/app/globals.css"; // Tailwind CSS 스타일 임포트

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
