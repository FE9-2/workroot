import { cn } from "@/lib/tailwindUtil";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/textInput";

interface DisabledInputProps extends Omit<BaseInputProps, "variant"> {
  value: string;
}

const DisabledInput = ({ value, ...props }: DisabledInputProps) => {
  return (
    <div className="relative w-full">
      <BaseInput
        {...props}
        variant="transparent"
        readOnly={true}
        value={value}
        wrapperClassName={cn("w-full", props.wrapperClassName)}
        innerClassName={cn("text-gray-500", props.innerClassName)}
      />
    </div>
  );
};

export default DisabledInput;
