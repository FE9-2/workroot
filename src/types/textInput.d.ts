export interface BaseTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: "white" | "transparent";
  size?: string;
  errorMessage?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "white" | "transparent";
  size?: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  readOnly?: boolean;
  errorMessage?: string;
  feedbackMessage?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  afterString?: string;
  wrapperClassName?: string; // 부가적인 tailwind css 클래스
  innerClassName?: string; // 부가적인 tailwind css 클래스
  anotherHoverStyle?: string;
}

export type TextAreaProps = Omit<BaseTextAreaProps, "variant">;

export type TextInputProps = Omit<BaseInputProps, "variant">;

export interface BaseFileInputProps {
  name: string;
  variant: "upload" | "download";
  size?: string;
  file?: File | null;
  onFileAction?: (file: File | null) => void;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
  placeholder?: string;
}
