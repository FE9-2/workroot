"use client";
import AddFormLayout from "@/app/components/layout/addFormLayout/AddFormLayout";
import { usePathname } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const title = pathname.split("/").includes("apply") ? "알바폼 지원하기" : "알바폼 만들기";
  return (
    <AddFormLayout title={title}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </AddFormLayout>
  );
}
