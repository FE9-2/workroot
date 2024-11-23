export interface BaseTextAreaProps {
  name: string;
  variant: "white" | "transparent";
  rules?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
}

export interface BaseInputProps {
  name: string;
  type?: string;
  variant: "white" | "transparent";
  rules?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  errorMessage?: string;
  feedbackMessage?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
}
