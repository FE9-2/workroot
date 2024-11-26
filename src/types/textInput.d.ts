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
  errorMessage?: string;
  feedbackMessage?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  afterString?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  anotherHoverStyle?: string;
}

export interface BaseFileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  variant: "upload" | "download";
  size?: string;
  file?: File | null;
  onFileAction?: (file: File | null) => void;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
}
