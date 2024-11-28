/**
{
  "updatedAt": "2024-11-28T04:27:51.626Z",
  "createdAt": "2024-11-28T04:27:51.626Z",
  "preferred": "string",
  "age": "string",
  "education": "string",
  "gender": "string",
  "numberOfPositions": 0,
  "isPublic": true,
  "hourlyWage": 0,
  "isNegotiableWorkDays": true,
  "workDays": [
    "string"
  ],
  "workEndTime": "string",
  "workStartTime": "string",
  "workEndDate": "2024-11-28T04:27:51.626Z",
  "workStartDate": "2024-11-28T04:27:51.626Z",
  "location": "string",
  "imageUrls": [
    "string"
  ],
  "recruitmentEndDate": "2024-11-28T04:27:51.626Z",
  "recruitmentStartDate": "2024-11-28T04:27:51.626Z",
  "description": "string",
  "title": "string",
  "ownerId": 0,
  "id": 0,
  "scrapCount": 0,
  "applyCount": 0,
  "isScrapped": true,
  "phoneNumber": "string",
  "storePhoneNumber": "string",
  "storeName": "string"
}
 */

import React from "react";
import { FormDetailResponse } from "@/types/response/form";

const RecruitDetail: React.FC<{ recruitData: FormDetailResponse }> = ({ recruitData }) => {
  return (
    <div className="w-[375px] bg-white px-6 py-3 md:w-[640px] md:py-16">
      <div>
        <span>모집 기간:</span> {new Date(recruitData.recruitmentStartDate).toLocaleDateString()} ~{" "}
        {new Date(recruitData.recruitmentEndDate).toLocaleDateString()}
      </div>

      {/* 가게 전화번호 */}
      <div>
        <span className="text-black-100">가게 전화번호</span> <strong>{recruitData.storePhoneNumber}</strong>
      </div>

      {/* 사장님 전화번호 */}
      <div>
        <span className="text-black-400">사장님 전화번호</span> <strong>{recruitData.phoneNumber}</strong>
      </div>
    </div>
  );
};

export default RecruitDetail;
