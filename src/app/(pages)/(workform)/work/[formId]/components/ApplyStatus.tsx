import ApplyStatusCard from "@/app/components/card/cardList/apply/ApplyStatusCard";
import React from "react";

interface ApplyStatusProps {
  formId: number;
}

export default function ApplyStatus({ formId }: ApplyStatusProps) {
  return (
    <>
      <div className="mt-20 space-y-6 border-t-2 pt-20 text-2xl">
        <p className="text-2xl font-bold">지원 현황</p>
        <ApplyStatusCard formId={formId} />
      </div>
    </>
  );
}
