import { ReactNode } from "react";
import ApplyHeader from "../../component/ApplyHeader";

export default function ApplyFormLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="">
        <ApplyHeader title="알바폼 지원하기" />
        {children}
      </main>
    </>
  );
}
