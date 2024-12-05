import { cn } from "@/lib/tailwindUtil";
import { ReactNode } from "react";

const Label = ({
  children,
  required = true,
  className,
}: {
  children: ReactNode;
  required?: boolean;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-baseline gap-[2px]", className)}>
      <span className="text-sm font-medium leading-6 text-black-400 lg:text-xl lg:leading-8 lg:text-black-300">
        {children}
      </span>
      {required && (
        <span className="items-baseline pt-[2px] text-sm font-normal leading-6 text-primary-orange-300 lg:text-xl lg:leading-8">
          *
        </span>
      )}
    </div>
  );
};

export default Label;
