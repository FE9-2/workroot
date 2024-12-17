import { createPortal } from "react-dom";
import useModalStore from "@/store/modalStore";
import FormContinueModal from "./modals/alert/FormContinueModal";
import ApplicationDetailModal from "./modals/alert/ApplicationDetailModal";
import RecruitmentClosedModal from "./modals/alert/RecruitmentClosedModal";
import DeleteFormModal from "./modals/confirm/DeleteFormModal";
import SelectProgressModal from "./modals/confirm/SelectProgressModal";
import ChangePasswordModal from "./modals/form/ChangePasswordModal";
import EditMyProfileModal from "./modals/form/EditMyProfileModal";
import EditOwnerProfileModal from "./modals/form/EditOwnerProfileModal";
import CustomFormModal from "./modals/confirm/CustomFormModal";
import { ModalType } from "@/types/modal";
import { useEffect } from "react";
import MyApplicationModal from "./modals/apply/MyApplicationModal";

// 모달 컴포넌트 매핑
const ModalComponents = {
  applicationDetail: ApplicationDetailModal,
  formContinue: FormContinueModal,
  recruitmentClosed: RecruitmentClosedModal,
  deleteForm: DeleteFormModal,
  selectProgress: SelectProgressModal,
  changePassword: ChangePasswordModal,
  editMyProfile: EditMyProfileModal,
  editOwnerProfile: EditOwnerProfileModal,
  customForm: CustomFormModal,
  myApplication: MyApplicationModal,
} as const;

const ModalLayout = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore();

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // 컴포넌트가 언마운트될 때 스크롤 상태 복구
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !modalType || !modalProps) return null;

  if (!Object.keys(ModalComponents).includes(modalType)) {
    console.error(`Unknown modal type: ${modalType}`);
    return null;
  }

  const ModalComponent = ModalComponents[modalType as ModalType];

  return createPortal(
    <div
      className="!z-99999 fixed inset-0 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <ModalComponent isOpen={isOpen} onClose={closeModal} {...(modalProps as any)} />
      </div>
    </div>,
    document.body
  );
};

export default ModalLayout;
