import { ReactNode } from "react";
import ApplyHeader from "../../component/ApplyHeader";

export default function ApplyFormLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ApplyHeader title="알바폼 지원하기" />
      <div className="px-6 pb-[68px] md:px-[208px] lg:px-[640px]">
        {children}
      </div>;
    </>
  );
}
