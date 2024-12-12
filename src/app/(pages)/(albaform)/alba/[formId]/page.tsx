"use client";
// 알바폼 상세 페이지
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/queries/user/me/useUser";
import FormHeader from "./edit/components/FormHeader";
import FormDetails from "./edit/components/FormDetail";
import RecruitInformation from "./edit/components/RecruitInfomation";
import ApplicationStatus from "./edit/components/ApplicationStatus";
import { useFormDetail } from "@/hooks/queries/form/detail/useFormDetail";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import Script from "next/script";

interface Coords {
  lat: number;
  lng: number;
}

export default function AlbaFormDetailPage() {
  const { formId } = useParams();
  const [formIdState, setFormIdState] = useState<number>(0);
  const { user } = useUser();
  const isOwner = user?.role === "OWNER";

  // 카카오맵 관련 상태
  const [coords, setCoords] = useState<Coords>({ lat: 37.5665, lng: 126.978 });
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY as string,
    libraries: ["services"],
  });

  useEffect(() => {
    if (formId) {
      setFormIdState(Number(formId));
    }
  }, [formId]);

  const { albaFormDetailData, isLoading, error: formError } = useFormDetail({ formId: formIdState });

  // 주소로 좌표 검색
  useEffect(() => {
    if (!albaFormDetailData?.location) return;

    if (typeof window === "undefined" || !window.kakao?.maps?.services) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(albaFormDetailData.location, (result: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        const { x, y } = result[0];
        setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
      }
    });
  }, [albaFormDetailData?.location]);

  if (isLoading) return <div>Loading...</div>;
  if (formError) return <div>Error: 데이터를 불러오는데 문제가 발생했습니다.</div>;
  if (!albaFormDetailData) return <div>데이터가 없습니다.</div>;

  return (
    <div className="container flex min-h-screen flex-col px-4 sm:px-6 md:px-0">
      {/* 사진영역 */}
      <div className="h-[300px] bg-black-100 sm:h-[400px] md:h-[562px]">사진영역</div>
      <div className="mt-4 flex flex-col justify-between sm:mt-10 md:mt-20 md:flex-row">
        {/* 왼쪽 영역 */}
        <div className="w-full space-y-10 sm:w-[600px] md:w-[770px]">
          <FormHeader albaFormDetailData={albaFormDetailData} />
          <FormDetails albaFormDetailData={albaFormDetailData} />

          {/* 카카오맵 스크립트 */}
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="afterInteractive" />

          {/* 지도 영역 */}
          <div className="h-[280px] md:h-[320px]">
            {error && <div className="text-red-500">Map load error: {String(error)}</div>}
            {loading && <div className="flex h-full items-center justify-center">Loading map...</div>}
            {!loading && !error && (
              <Map center={coords} style={{ width: "100%", height: "100%" }} level={3}>
                <MapMarker position={coords}>
                  <div className="p-2">{albaFormDetailData.title}</div>
                </MapMarker>
              </Map>
            )}
          </div>
        </div>

        {/* 오른쪽 영역 */}
        <div className="flex w-full flex-col space-y-12 sm:w-[400px] md:w-[640px]">
          <RecruitInformation albaFormDetailData={albaFormDetailData} />
        </div>
      </div>
      {/* 지원 현황 */}
      {isOwner && <ApplicationStatus formId={formIdState} />}
    </div>
  );
}
