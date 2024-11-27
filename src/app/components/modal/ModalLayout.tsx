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
import { ModalType } from "@/types/modal";

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
} as const;

const ModalLayout = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore();

  if (!isOpen || !modalType || !modalProps) return null;

  if (!Object.keys(ModalComponents).includes(modalType)) {
    console.error(`Unknown modal type: ${modalType}`);
    return null;
  }

  const ModalComponent = ModalComponents[modalType as ModalType];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="w-full max-w-md rounded-2xl">
        <ModalComponent isOpen={isOpen} onClose={closeModal} {...(modalProps as any)} />
      </div>
    </div>,
    document.body
  );
};

export default ModalLayout;
