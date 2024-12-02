"use client";
import { ReactNode } from "react";
import ApplyHeader from "./ApplyHeader";
import { useRouter } from "next/navigation";

export default function AddFormLayout({ children, title }: { children: ReactNode; title: string }) {
  const router = useRouter();

  return (
    <>
      <main className="mx-auto w-[327px] pb-[70px] lg:w-[640px]">
        <ApplyHeader title={title} onCancel={() => router.back()} />
        {children}
      </main>
    </>
  );
}
