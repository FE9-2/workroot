import { cn } from "@/lib/tailwindUtil";
import Image from "next/image";

interface AlertModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

const AlertModal = ({ isOpen, title, message, onClose, buttonText, onButtonClick, className }: AlertModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={cn("w-full max-w-sm rounded-lg bg-white p-6 shadow-lg", className)}>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <Image src="/icons/x/x-sm.svg" alt="close" width={16} height={16} className="block sm:hidden" />
            <Image src="/icons/x/x-md.svg" alt="close" width={20} height={20} className="hidden sm:block" />
          </button>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-orange-50">
              <Image
                src="/images/modal/warning-orange-sm.svg"
                alt="warning"
                width={32}
                height={32}
                className="block sm:hidden"
              />
              <Image
                src="/images/modal/warning-orange-md.svg"
                alt="warning"
                width={40}
                height={40}
                className="hidden sm:block"
              />
            </div>
            <h2 className="mb-2 text-xl font-bold">{title}</h2>
            <p className="mb-6 text-gray-600">{message}</p>
            <button
              onClick={onButtonClick}
              className="w-full rounded-md bg-primary-orange-300 px-4 py-2 text-white transition-colors hover:bg-primary-orange-400"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
