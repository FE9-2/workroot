import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import Image from "next/image";
import Link from "next/link";

interface FormContinueModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const FormContinueModal = ({ isOpen, onClose, className }: FormContinueModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "relative left-1/2 w-[375px] -translate-x-1/2 rounded-3xl bg-white p-6 shadow-lg lg:w-[520px] lg:p-10",
        className
      )}
    >
      <div className="relative h-full">
        <button
          type="button"
          onClick={onClose}
          className="hover:text-grayscale-600 absolute right-0 top-0 flex items-center justify-center text-grayscale-400"
        >
          <Image src="/icons/x/x-sm.svg" alt="close" width={16} height={16} className="block sm:hidden" />
          <Image src="/icons/x/x-md.svg" alt="close" width={20} height={20} className="hidden sm:block" />
        </button>
        <div className="flex h-full flex-col items-center text-center">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center lg:h-[120px] lg:w-[120px]">
            <Image
              src="/images/modal/closed-orange-sm.svg"
              alt="warning"
              width={80}
              height={80}
              className="block sm:hidden"
            />
            <Image
              src="/images/modal/closed-orange-md.svg"
              alt="warning"
              width={120}
              height={120}
              className="hidden sm:block"
            />
          </div>
          <h2 className="mb-2 text-lg font-bold lg:text-xl">작성 중인 워크폼이 있어요!</h2>
          <p className="text-grayscale-600 mb-6 text-sm lg:text-base">이어서 작성하시겠어요?</p>

          <div className="mt-auto">
            <Link href="/" className="block">
              <Button
                type="button"
                className="h-[58px] w-[327px] text-base font-medium lg:h-[72px] lg:w-[360px] lg:text-lg"
              >
                이어쓰기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContinueModal;
