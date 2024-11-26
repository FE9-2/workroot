import { createPortal } from "react-dom";
import useModalStore from "@/store/modalStore";
import AlertModal from "./modals/AlertModal";
import ConfirmModal from "./modals/ConfirmModal";
import FormModal from "./modals/FormModal";

type ImplementedModalType = "alert" | "confirm" | "form";

// 모달 컴포넌트 매핑
const ModalComponents = {
  alert: AlertModal,
  confirm: ConfirmModal,
  form: FormModal,
} as const;

const ModalLayout = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore();

  if (!isOpen || !modalType || !modalProps) return null;

  if (!Object.keys(ModalComponents).includes(modalType)) {
    console.error(`Unknown modal type: ${modalType}`);
    return null;
  }

  const ModalComponent = ModalComponents[modalType as ImplementedModalType];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <ModalComponent isOpen={isOpen} onClose={closeModal} {...(modalProps as any)} />
    </div>,
    document.body
  );
};

export default ModalLayout;
