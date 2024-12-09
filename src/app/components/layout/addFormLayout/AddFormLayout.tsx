"use client";
import { ReactNode } from "react";
import ApplyHeader from "./ApplyHeader";
import { useRouter } from "next/navigation";

export default function AddFormLayout({ children, title }: { children: ReactNode; title: string }) {
  const router = useRouter();

  return (
    <>
      <div className="mx-auto my-10 w-[327px] pb-[70px] lg:ml-[600px] lg:w-[640px] lg:pl-10">
        <ApplyHeader title={title} onCancel={() => router.back()} />
        {children}
      </div>
    </>
  );
}
