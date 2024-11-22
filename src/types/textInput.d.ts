export interface BaseTextAreaProps {
  name: string;
  variant: "white" | "transparent";
  rules?: boolean;
  size?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
}
