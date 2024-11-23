export interface BaseTextAreaProps {
  name: string;
  variant: "white" | "transparent";
  size?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  wrapperClassName?: string; // 부가적인 tailwind css 클래스
  innerClassName?: string; // 부가적인 tailwind css 클래스
}

export interface BaseInputProps {
  name: string;
  type: string;
  variant: "white" | "transparent";
  size?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  feedbackMessage?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  wrapperClassName?: string; // 부가적인 tailwind css 클래스
  innerClassName?: string; // 부가적인 tailwind css 클래스
}
