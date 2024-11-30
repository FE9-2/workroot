"use client";
import { ReactNode } from "react";
import ApplyHeader from "../../component/ApplyHeader";
import { useRouter } from "next/navigation";

export default function ApplyFormLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <>
      <main className="mx-auto w-[375px] pb-[70px] lg:w-[640px]">
        <ApplyHeader title="알바폼 지원하기" onCancel={() => router.back()} />
        {children}
      </main>
    </>
  );
}
