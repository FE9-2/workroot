"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/tailwindUtil";

interface FloatingBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "white";
  icon?: ReactNode;
  disabled?: boolean;
}

const FloatingBtn = ({ variant = "orange", icon, children, className, disabled, ...props }: FloatingBtnProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium rounded-full h-12";

  const variants = {
    orange: "bg-primary-orange-300 text-white",
    white: "bg-white text-primary-orange-300 border border-primary-orange-300",
  };

  const hoverStyles = {
    orange: "hover:bg-primary-orange-200",
    white: "hover:text-primary-orange-200",
  };
  const disabledStyles = "bg-grayscale-100 text-white cursor-not-allowed border-none";

  const widthStyles = children ? "w-auto px-3" : "w-12";

  return (
    <button
      type="button"
      className={cn(
        baseStyles,
        variants[variant],
        widthStyles,
        disabled ? disabledStyles : hoverStyles[variant],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <span className={cn(children ? "ml-2" : "", "hidden text-lg sm:inline lg:text-2xl")}>{children}</span>
    </button>
  );
};

export default FloatingBtn;
