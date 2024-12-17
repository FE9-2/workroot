import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import ColorPalette from "./ColorPalette";

export default {
  title: "Design System/Colors",
  component: ColorPalette,
} as Meta;

const Template: StoryFn = () => <ColorPalette />;

export const Default = Template.bind({});
