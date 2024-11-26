import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/Button";
import ReadOnlyInput from "@/app/components/input/text/ReadOnlyInput";
import { formatDateTime } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";

interface ApplicationDetailModalProps {
  formId: string;
  applicationDate?: string;
  applicationStatus?: string;
  name: string;
  phone: string;
  password: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const ApplicationDetailModal = ({
  formId,
  applicationDate,
  applicationStatus,
  name,
  phone,
  isOpen,
  onClose,
  className,
}: ApplicationDetailModalProps) => {
  if (!isOpen) return null;

  const defaultFields = [
    {
      name: "name",
      label: "이름",
      type: "text",
      value: name,
    },
    {
      name: "phone",
      label: "전화번호",
      type: "tel",
      value: phone,
    },
    {
      name: "password",
      label: "비밀번호",
      type: "password",
      value: "••••••••",
    },
  ];

  return (
    <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={cn(
          "relative h-[544px] w-[375px] overflow-hidden rounded-3xl bg-white p-6 md:h-[668px] md:w-[440px]",
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:text-gray-600"
        >
          <Image src="/icons/x/x-sm.svg" alt="close" width={16} height={16} className="block sm:hidden" />
          <Image src="/icons/x/x-md.svg" alt="close" width={20} height={20} className="hidden sm:block" />
        </button>

        <div className="flex h-full flex-col">
          <div className="mb-6 md:mb-8">
            <div className="text-lg font-semibold md:text-2xl">내 지원 내역</div>
          </div>

          <div className="flex-1">
            <div className="space-y-4 md:space-y-5">
              {applicationDate && (
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-muted-foreground">지원일시</span>
                  <span>{formatDateTime(applicationDate)}</span>
                </div>
              )}

              {applicationStatus && (
                <div className="flex items-center justify-between text-sm md:text-base">
                  <span className="text-muted-foreground">진행 상태</span>
                  <span className="rounded bg-primary-orange-50 px-2 py-1 font-semibold text-primary-orange-300">
                    {applicationStatus}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4 md:mt-8 md:space-y-6">
              {defaultFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <label htmlFor={field.name} className="text-muted-foreground block text-sm md:text-base">
                    {field.label}
                  </label>
                  <ReadOnlyInput
                    name={field.name}
                    type={field.type}
                    value={field.value}
                    size="w-full h-[48px] md:h-[54px]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <Link href={`/forms/${formId}`} className="block">
              <Button type="button" className="h-[48px] w-full text-base font-medium md:h-[54px] md:text-lg">
                지원 내역 상세보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;
