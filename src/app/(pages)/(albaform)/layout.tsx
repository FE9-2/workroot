"use client";
import AddFormLayout from "@/app/components/layout/addFormLayout/AddFormLayout";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AddFormLayout>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </AddFormLayout>
  );
}
