import BaseTextArea from "./BaseTextArea";
import { BaseTextAreaProps } from "@/types/textInput";

type TransparentTextAreaProps = Omit<BaseTextAreaProps, "variant">;

const TransparentTextArea = (props: TransparentTextAreaProps) => {
  return <BaseTextArea {...props} variant="transparent" />;
};

export default TransparentTextArea;
