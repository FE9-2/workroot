"use client";
import { ReactNode, Suspense } from "react";
import { cn } from "@/lib/tailwindUtil";
import ApplyHeader from "./component/ApplyHeader";
import useModalStore from "@/store/modalStore";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";

export default function Layout({ children }: { children: ReactNode }) {
  const { openModal } = useModalStore();
  const router = useRouter();
  const pathname = usePathname();

  const formPath = ["edit", "addform", "apply"];
  //formPath 배열의 원소 중 포함되는게 있는지 여부 확인

  const isForm: boolean = pathname.split("/").some((path) => formPath.includes(path));
  const isFormWithTab: boolean = pathname.split("/").some((path) => path === "addform" || path === "edit");
  const title = pathname.split("/").includes("apply") && isForm ? "워크폼 지원하기" : "워크폼 작성하기";

  // 폼 작성 페이지 레이아웃
  const FormStyle = cn(
    "mx-auto my-10 w-[327px] pb-[70px] lg:w-[680px] lg:pb-0 lg:pl-10",
    isFormWithTab ? "lg:ml-[600px]" : ""
  );

  // 상세 페이지 레이아웃
  const DetailStyle = "mx-auto max-w-screen-xl  px-4 py-4 sm:px-6 md:py-8 justify-center flex";

  return (
    <div className={cn(isForm ? FormStyle : DetailStyle)}>
      {isForm && (
        <ApplyHeader
          title={title}
          onCancel={() =>
            openModal("customForm", {
              isOpen: true,
              title: "폼 작성 취소",
              content: "작성을 취소하시겠습니까?",
              onConfirm: () => {
                openModal("customForm", {
                  isOpen: false,
                  title: "",
                  content: "",
                  onConfirm: () => {},
                  onCancel: () => {},
                });
                router.back();
              },
              onCancel: () => {
                openModal("customForm", {
                  isOpen: false,
                  title: "",
                  content: "",
                  onConfirm: () => {},
                  onCancel: () => {},
                });
              },
            })
          }
        />
      )}
      <Suspense
        fallback={
          <div className="flex h-[calc(100vh-200px)] items-center justify-center">
            <LoadingSpinner />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
