"use client";
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/tailwindUtil";

interface FloatingBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "white";
  icon?: ReactNode;
}

const FloatingBtn = ({ variant = "orange", icon, children, className, ...props }: FloatingBtnProps) => {
  const baseStyles = "inline-flex items-center justify-center transition-colors font-medium rounded-full h-12";

  const variants = {
    orange: "bg-primary-orange-300 text-white hover:bg-primary-orange-200",
    white: "bg-white text-primary-orange-300 border border-primary-orange-300 hover:bg-primary-grayscale-100",
  };

  const widthStyles = children ? "w-auto px-3" : "w-12";

  return (
    <button type="button" className={cn(baseStyles, variants[variant], widthStyles, className)} {...props}>
      {icon && <span className="text-2xl">{icon}</span>}
      <span className={cn(children ? "ml-2" : "", "hidden sm:inline")}>{children}</span>
    </button>
  );
};

export default FloatingBtn;
