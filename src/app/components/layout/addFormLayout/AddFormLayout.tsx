"use client";
import { ReactNode } from "react";
import ApplyHeader from "./ApplyHeader";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/tailwindUtil";

export default function AddFormLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const title = pathname.split("/").includes("apply") ? "알바폼 지원하기" : "알바폼 만들기";
  return (
    <>
      <div
        className={cn(
          "mx-auto my-10 w-[327px] pb-[70px] lg:w-[680px] lg:pl-10",
          title === "알바폼 만들기" ? "lg:ml-[600px]" : ""
        )}
      >
        <ApplyHeader title={title} onCancel={() => router.back()} />
        {children}
      </div>
    </>
  );
}
