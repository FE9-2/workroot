import Button from "@/app/components/button/default/Button";
import Link from "next/dist/client/link";
import { cn } from "@/lib/tailwindUtil";
import Image from "next/image";

interface RecruitmentClosedModalProps {
  formId: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const RecruitmentClosedModal = ({ formId, isOpen, onClose, className }: RecruitmentClosedModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "relative left-1/2 h-[284px] w-[375px] -translate-x-1/2 rounded-3xl bg-white p-6 shadow-lg md:h-[384px] md:w-[520px]",
        className
      )}
    >
      <div className="relative h-full">
        <button
          onClick={onClose}
          className="hover:text-grayscale-600 absolute right-0 top-0 flex items-center justify-center text-grayscale-400"
        >
          <Image src="/icons/x/x-sm.svg" alt="close" width={16} height={16} className="block sm:hidden" />
          <Image src="/icons/x/x-md.svg" alt="close" width={20} height={20} className="hidden sm:block" />
        </button>
        <div className="flex h-full flex-col items-center py-4 text-center md:py-6">
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
          <h2 className="mb-2 text-lg font-bold md:text-xl">모집 마감</h2>
          <p className="text-grayscale-600 mb-6 text-sm md:text-base">모집이 종료된 알바폼입니다.</p>

          <div className="mt-auto">
            <Link href={`/forms/${formId}`} className="block">
              <Button
                type="button"
                className="h-[58px] w-[327px] text-base font-medium md:h-[72px] md:w-[360px] md:text-lg"
              >
                홈으로 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentClosedModal;
