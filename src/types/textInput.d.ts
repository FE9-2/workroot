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
  value?: string;
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
  afterString?: string;
  wrapperClassName?: string; // 부가적인 tailwind css 클래스
  innerClassName?: string; // 부가적인 tailwind css 클래스
  anotherHoverStyle?: string; // 추가적인 hover 스타일 - 없으면 기본값
}

export interface BaseFileInputProps {
  name: string;
  variant: "upload" | "download";
  size?: string;
  file?: File | null;
  onFileAction?: (file: File | null) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  actionIcon?: React.ReactNode;
}
