import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outlined";
  width?: "xs" | "sm" | "md" | "lg";
  radius?: "lg" | "full";
  disabled?: boolean;
}

/**
 * 버튼 컴포넌트
 * @param variant - 버튼 스타일 solid | outlined
 * @param width - 버튼 너비 xs | sm | md | lg
 * @param radius - 버튼 모서리 둥글기 md | full
 * @param disabled - 비활성화 여부 true | false
 * @param children - 버튼 내용 (텍스트, 아이콘 등)
 * @param props - 버튼 속성 (onClick, type 등)
 * @returns 버튼 컴포넌트
 */

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "solid", width = "md", radius = "lg", disabled, children, ...props }, ref) => {
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
      xs: "w-[80px]",
      sm: "w-[180px]",
      md: "w-[327px]",
      lg: "w-[640px]",
    };

    const radiuses = {
      lg: "rounded-lg",
      full: "rounded-full",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${widths[width]} ${radiuses[radius]} ${className}`.trim()}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "DefaultButton"; // 컴포넌트가 개발자 도구에서 DefaultButton로 표시됨

export default Button;
