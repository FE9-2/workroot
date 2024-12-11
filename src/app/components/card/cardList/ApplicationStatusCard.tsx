"use client";

import React from "react";
import { ApplicationResponse } from "@/types/response/application";

interface ApplicationStatusCardProps {
  applicationStatusData: ApplicationResponse[]; // 전달받는 데이터는 배열
}

export default function ApplicationStatusCard({ applicationStatusData }: ApplicationStatusCardProps) {
  return (
    <div>
      {applicationStatusData.map((application) => (
        <div key={application.id}>{application.name}</div> // 고유 키 추가
      ))}
    </div>
  );
}
