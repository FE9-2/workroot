import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined";
  width?: "normal" | "wide";
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "solid", width = "normal", disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg transition-colors font-medium h-12";

    const variants = {
      solid: [
        "bg-primary-orange-300 text-gray-100",
        "hover:bg-primary-orange-200",
        "focus:ring-1 focus:ring-primary-orange-200 focus:outline-none",
        "disabled:bg-gray-100 disabled:cursor-not-allowed text-white",
      ].join(" "),
      outlined: [
        "border-2 border-primary-orange-300 text-primary-orange-300",
        "hover: hover:border-primary-orange-200 hover:text-primary-orange-200",
        "focus:ring-1 focus:ring-primary-orange-200 focus:outline-none",
        "disabled:border-gray-100 disabled:text-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent",
      ].join(" "),
    };

    const widths = {
      normal: "w-[327px]",
      wide: "w-[640px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${widths[width]} ${className}`.trim()}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
