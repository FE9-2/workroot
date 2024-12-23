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
  | "myApplication" // 회원 지원내역 조회
  | "verifyMyApplication"; // 지원내역 조회 확인

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

// 회원의 내 지원내역 모달
type MyApplicationModalProps = BaseModalProps & {
  isOpen: boolean;
  formId: number | string;
  className?: string;
  verifyData?: {
    // 비회원 인증 데이터
    name: string;
    phoneNumber: string;
    password: string;
  };
  // 지원자 상세 데이터
  initialData?: ApplicationResponse;
};

// 지원내역 조회 확인 모달
type VerifyApplicationModalProps = BaseModalProps & {
  isOpen: boolean;
  formId: number | string;
  className?: string;
  onVerify: (data: { password: string; phoneNumber: string; name: string }) => void;
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
  myApplication: MyApplicationModalProps;
  verifyMyApplication: VerifyApplicationModalProps;
};
