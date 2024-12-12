import { cn } from "@/lib/tailwindUtil";
import BaseInput from "@/app/components/input/text/BaseInput";
import { passwordSchema } from "@/schemas/commonSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogout } from "@/hooks/queries/auth/useLogout";
import { usePassword } from "@/hooks/queries/user/me/useChangePassword";
import DotLoadingSpinner from "@/app/components/loading-spinner/DotLodingSpinner";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "새 비밀번호는 현재 비밀번호와 달라야 합니다",
    path: ["newPassword"],
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const defaultFields = [
  {
    name: "currentPassword" as const,
    label: "현재 비밀번호",
    placeholder: "현재 비밀번호를 입력해주세요.",
    type: "password",
  },
  {
    name: "newPassword" as const,
    label: "새 비밀번호",
    placeholder: "새로운 비밀번호를 입력해주세요.",
    type: "password",
  },
  {
    name: "confirmPassword" as const,
    label: "새 비밀번호 확인",
    placeholder: "새로운 비밀번호를 다시 한번 입력해주세요.",
    type: "password",
  },
] as const;

const ChangePasswordModal = ({ isOpen, onClose, className }: ChangePasswordModalProps) => {
  const { mutate: changePassword, isPending } = usePassword();
  const { logout } = useLogout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  if (!isOpen) return null;

  const onSubmitHandler = async (data: ChangePasswordFormData) => {
    if (isPending) return;

    changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
          logout();
        },
      }
    );
  };

  return (
    <div
      className={cn(
        "relative left-1/2 h-[484px] w-[375px] -translate-x-1/2 overflow-hidden rounded-2xl bg-white p-6 shadow-lg sm:p-8 md:h-[666px] md:w-[720px]",
        className
      )}
    >
      <div className="mb-8 h-[46px] text-center text-xl font-semibold md:mb-12 md:text-2xl">비밀번호 변경</div>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4 md:space-y-6">
        {defaultFields.map((field) => (
          <div key={field.name} className="h-[88px] space-y-1.5 md:h-[114px] md:space-y-2">
            <label className="text-grayscale-700 block text-sm font-semibold md:px-2 md:text-base">{field.label}</label>
            <div className="flex w-full flex-col items-center">
              <BaseInput
                {...register(field.name)}
                type={field.type}
                placeholder={field.placeholder}
                variant="white"
                disabled={isPending}
                size="w-[327px] h-[54px] md:w-[640px] md:h-[64px]"
                errormessage={errors[field.name]?.message}
              />
            </div>
          </div>
        ))}
        <div className="mt-4 flex h-[58px] gap-3 md:mt-6 md:h-[72px]">
          <button
            type="button"
            onClick={() => {
              onClose();
              reset();
            }}
            disabled={isPending}
            className="text-grayscale-700 flex-1 rounded-md border border-grayscale-300 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-grayscale-50 md:text-base"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600 md:text-base"
          >
            {isPending ? <DotLoadingSpinner /> : "변경하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordModal;
