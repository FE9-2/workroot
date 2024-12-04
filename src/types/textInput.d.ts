export interface BaseTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant: "white" | "transparent";
  size?: string;
  errormessage?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: "white" | "transparent";
  size?: string;
  errormessage?: string | boolean;
  feedbackMessage?: string;
  beforeIcon?: React.ReactNode;
  afterIcon?: React.ReactNode;
  afterString?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  anotherHoverStyle?: string;
}

export interface BaseFileInputProps {
  name: string;
  variant: "upload" | "download";
  size?: string;
  file?: File | null;
  onFileAction?: (file: File | null) => void;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
  placeholder: string;
  onChange?: (event: Event) => void;
  accept?: string;
}
