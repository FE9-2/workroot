export type ModalType =
  | "applicationDetail"
  | "formContinue"
  | "recruitmentClosed"
  | "deleteForm"
  | "selectProgress"
  | "changePassword"
  | "editMyProfile"
  | "editOwnerProfile";

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
  formId: string;
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
  deleteForm: DeleteFormModalProps;
  selectProgress: SelectProgressModalProps;
  changePassword: FormModalProps;
  editMyProfile: FormModalProps;
  editOwnerProfile: FormModalProps;
};
