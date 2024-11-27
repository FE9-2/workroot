import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
import Image from "next/image";

interface DeleteFormModalProps {
  formId: string;
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  className?: string;
}

const DeleteFormModal = ({ formId, isOpen, onConfirm, onClose, className }: DeleteFormModalProps) => {
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/forms/${formId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onConfirm();
        onClose();
      }
    } catch (error) {
      console.error("Failed to delete form:", error);
    }
  };

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={cn(
          "h-[330px] w-[375px] rounded-3xl bg-white pb-8 pt-4 shadow-lg md:h-[440px] md:w-[520px]",
          className
        )}
      >
        <div className="relative h-full">
          <form onSubmit={handleSubmit} className="flex h-full flex-col items-center text-center md:pt-8">
            <div className="flex items-center justify-center">
              <div className="relative h-20 w-20 md:h-[120px] md:w-[120px]">
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
            </div>
            <h2 className="mb-2 text-lg font-bold md:text-xl">알바폼을 삭제할까요?</h2>
            <p className="mb-6 text-sm text-gray-600 md:text-base">삭제 후 정보를 복구할 수 없어요.</p>

            <div className="mt-auto flex w-full flex-col items-center gap-3">
              <Button
                type="submit"
                className="h-[48px] w-[300px] text-base font-medium md:h-[62px] md:w-[360px] md:text-lg"
              >
                삭제하기
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={onClose}
                className="h-[48px] w-[300px] text-base font-medium hover:border-primary-orange-50 hover:bg-primary-orange-100 hover:text-white md:h-[62px] md:w-[360px] md:text-lg"
              >
                다음에 할께요
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteFormModal;
