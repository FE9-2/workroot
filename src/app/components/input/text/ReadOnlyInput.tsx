import { cn } from "@/lib/tailwindUtil";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";

interface ReadOnlyInputProps extends Omit<BaseInputProps, "variant"> {
  value: string;
}

const ReadOnlyInput = ({ value, ...props }: ReadOnlyInputProps) => {
  return (
    <div className="relative w-full">
      <BaseInput
        {...props}
        variant="transparent"
        readOnly={true}
        value={value}
        wrapperClassName={cn("w-full", props.wrapperClassName)}
        innerClassName={cn("text-grayscale-500", props.innerClassName)}
      />
    </div>
  );
};

export default ReadOnlyInput;
