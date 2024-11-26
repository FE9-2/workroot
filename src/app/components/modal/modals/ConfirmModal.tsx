import { cn } from "@/lib/tailwindUtil";
import Image from "next/image";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

const ConfirmModal = ({ isOpen, title, message, onClose, onConfirm, onCancel, className }: ConfirmModalProps) => {
  if (!isOpen) return null;

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={cn("w-full max-w-sm rounded-lg bg-white p-6 shadow-lg", className)}>
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-orange-50">
              <Image
                src="/images/modal/warning-orange-sm.svg"
                alt="warning"
                width={80}
                height={80}
                className="block sm:hidden"
              />
              <Image
                src="/images/modal/warning-orange-md.svg"
                alt="warning"
                width={120}
                height={120}
                className="hidden sm:block"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <p className="mb-6 text-gray-600">{message}</p>
            <div className="flex w-full gap-4">
              <button
                onClick={handleCancel}
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
