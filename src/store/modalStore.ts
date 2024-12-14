import { create } from "zustand";
import type { ModalPropsMap, ModalType } from "@/types/modal";

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  modalProps: Partial<ModalPropsMap[keyof ModalPropsMap]>;
  openModal: <T extends ModalType>(type: T, props: ModalPropsMap[T]) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  modalProps: {},
  openModal: (type, props) => set({ isOpen: true, modalType: type, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: {} }),
}));

export default useModalStore;
