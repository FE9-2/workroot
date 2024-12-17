export type ModalType =
  | "applicationDetail"
  | "formContinue"
  | "recruitmentClosed"
  | "customForm"
  | "deleteForm"
  | "selectProgress"
  | "changePassword"
  | "editMyProfile"
  | "editOwnerProfile"
  | "myApplication";

type BaseModalProps = {
  onClose?: () => void;
};

type FormModalProps = BaseModalProps & {
  fields: string[];
  onSubmit: (data: Record<string, string>) => void;
};

type AlertModalProps = BaseModalProps & {
  title: string;
  message?: string;
  buttonText: string;
  onButtonClick: () => void;
};

type CustomFormModalProps = BaseModalProps & {
  isOpen: boolean;
  title: string;
  content: string;
  className?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  closeOnOverlayClick?: boolean;
};

type ConfirmFormModalProps = BaseModalProps & {
  id: string;
  isOpen: boolean;
  className?: string;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

type ApplicationDetailProps = BaseModalProps & {
  id: string;
  title: string;
  applicationDate?: string;
  applicationStatus?: string;
  name: string;
  phone: string;
  password: string;
};

export type ModalPropsMap = {
  applicationDetail: ApplicationDetailProps;
  formContinue: AlertModalProps;
  recruitmentClosed: AlertModalProps;
  customForm: CustomFormModalProps;
  deleteForm: ConfirmFormModalProps;
  selectProgress: ConfirmFormModalProps;
  changePassword: FormModalProps;
  editMyProfile: FormModalProps;
  editOwnerProfile: FormModalProps;
  myApplication: {
    formId: number | string;
  };
};
