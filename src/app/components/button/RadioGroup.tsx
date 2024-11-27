"use client";
import React from "react";
import { RadioBtnProps } from "./RadioBtn";

interface RadioGroupProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  className?: string;
  children: React.ReactNode;
}

const RadioGroup = <T extends string>({ value, onValueChange, className, children }: RadioGroupProps<T>) => {
  return (
    <div className={className} role="radiogroup">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioBtnProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            checked: value === child.props.value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              onValueChange(e.target.value as T);
              if (child.props.onChange) {
                child.props.onChange(e);
              }
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default RadioGroup;
