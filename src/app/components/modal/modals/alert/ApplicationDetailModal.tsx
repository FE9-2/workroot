import { cn } from "@/lib/tailwindUtil";
import Button from "@/app/components/button/default/Button";
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
    <div
      className={cn(
        "relative w-[375px] overflow-hidden rounded-3xl bg-white p-6 shadow-lg lg:w-[440px] lg:p-10",
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="mb-6 lg:mb-8">
          <div className="text-lg font-semibold lg:text-2xl">내 지원 내역</div>
        </div>

        <div className="space-y-4 lg:space-y-5">
          {applicationDate && (
            <div className="flex items-center justify-between text-sm lg:text-base">
              <span className="text-muted-foreground">지원일시</span>
              <span>{formatDateTime(applicationDate)}</span>
            </div>
          )}

          {applicationStatus && (
            <div className="flex items-center justify-between text-sm lg:text-base">
              <span className="text-muted-foreground">진행 상태</span>
              <span className="rounded bg-primary-orange-50 px-2 py-1 font-semibold text-primary-orange-300">
                {applicationStatus}
              </span>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4 lg:mt-8 lg:space-y-6">
          {defaultFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name} className="text-muted-foreground block text-sm lg:text-base">
                {field.label}
              </label>
              <ReadOnlyInput
                name={field.name}
                type={field.type}
                value={field.value}
                size="w-full h-[48px] lg:h-[54px]"
              />
            </div>
          ))}
        </div>

        <Link href={`/forms/${formId}`} className="block">
          <Button type="button" className="mt-6 h-[58px] !w-full text-base font-medium lg:mt-8 lg:h-[72px] lg:text-lg">
            지원 내역 상세보기
          </Button>
        </Link>

        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          className="hover:text-grayscale-600 absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white text-grayscale-400 lg:right-10 lg:top-10"
        >
          <Image src="/icons/x/x-sm.svg" alt="" width={16} height={16} className="block sm:hidden" />
          <Image src="/icons/x/x-md.svg" alt="" width={20} height={20} className="hidden sm:block" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;
