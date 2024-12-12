"use client";
import { ReactNode, Suspense } from "react";
import { cn } from "@/lib/tailwindUtil";
import ApplyHeader from "./component/ApplyHeader";
import useModalStore from "@/store/modalStore";
import { usePathname, useRouter } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const title = pathname.split("/").includes("apply") ? "알바폼 지원하기" : "알바폼 만들기";

  const { openModal } = useModalStore();

  return (
    <div
      className={cn(
        "mx-auto my-10 w-[327px] pb-[70px] lg:w-[680px] lg:pb-0 lg:pl-10",
        title === "알바폼 만들기" ? "lg:ml-[600px]" : ""
      )}
    >
      <ApplyHeader
        title={title}
        onCancel={() =>
          openModal("deleteForm", {
            id: "",
            isOpen: true,
            title: "폼 작성 취소",
            message: "작성을 취소하시겠습니까?",
            onCancel: () => console.log("모달 닫기"),
            onConfirm: () => router.back(),
          })
        }
      />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}
