import BaseTextArea from "./BaseTextArea";
import { BaseTextAreaProps } from "@/types/textInput";

type WhiteTextAreaProps = Omit<BaseTextAreaProps, "variant">;

const WhiteTextArea = (props: WhiteTextAreaProps) => {
  return <BaseTextArea {...props} variant="white" />;
};

export default WhiteTextArea;
