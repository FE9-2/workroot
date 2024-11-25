export interface AlertModalProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

export interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

export interface FormModalProps {
  fields: string[];
  onSubmit: (data: Record<string, string>) => void;
  className?: string;
}

export type ModalType = "alert" | "confirm" | "form";

export interface ModalPropsMap {
  alert: AlertModalProps;
  confirm: ConfirmModalProps;
  form: FormModalProps;
}
