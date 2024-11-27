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
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={cn("h-[284px] w-[375px] rounded-3xl bg-white p-6 shadow-lg md:h-[384px] md:w-[520px]", className)}
      >
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 flex items-center justify-center text-gray-400 hover:text-gray-600"
          >
            <Image src="/icons/x/x-sm.svg" alt="close" width={16} height={16} className="block sm:hidden" />
            <Image src="/icons/x/x-md.svg" alt="close" width={20} height={20} className="hidden sm:block" />
          </button>
          <div className="flex h-full flex-col items-center pt-8 text-center md:pt-12">
            <div className="flex items-center justify-center">
              <div className="relative h-20 w-20 md:h-[120px] md:w-[120px]">
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
            </div>
            <h2 className="mb-2 text-lg font-bold md:text-xl">작성 중인 알바폼이 있어요!</h2>
            <p className="mb-6 text-sm text-gray-600 md:text-base">이어서 작성하시겠어요?</p>

            <div className="mt-auto">
              <Link href="/" className="block">
                <Button
                  type="button"
                  className="h-[58px] w-[327px] text-base font-medium md:h-[72px] md:w-[360px] md:text-lg"
                >
                  이어쓰기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContinueModal;
