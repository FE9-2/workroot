"use client";
// 워크폼 상세 페이지
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/queries/user/me/useUser";
import { useFormDetail } from "@/hooks/queries/form/detail/useFormDetail";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import Script from "next/script";
import FormHeader from "./components/FormHeader";
import FormDetails from "./components/FormDetail";
import RecruitInformation from "./components/RecruitInformation";
import ApplyStatus from "./components/ApplyStatus";
import LoadingSpinner from "@/app/components/loading-spinner/LoadingSpinner";
import FormImage from "./components/FormImage";
import ScrapBtn from "@/app/components/button/default/ScrapBtn";
import { IoShareSocialSharp } from "react-icons/io5";
import ExpandedFloatingBtn from "@/app/components/button/default/ExpandedFloatingBtn";

interface Coords {
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    Kakao: any;
    kakao: any;
  }
}

export default function AlbaFormDetailPage() {
  const { formId } = useParams();
  const [formIdState, setFormIdState] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { user } = useUser();

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

  const { albaFormDetailData, isLoading } = useFormDetail({ formId: formIdState });
  const isOwner = user?.role === "OWNER";
  const isAuthor = user?.id === albaFormDetailData?.ownerId;

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

  // 공유 컨텐츠 설정
  const shareContent = albaFormDetailData
    ? {
        title: `${albaFormDetailData.title} | 워크루트`,
        description: `💼 ${albaFormDetailData.storeName}\n📍 ${albaFormDetailData.location}\n💰 시급 ${albaFormDetailData.hourlyWage.toLocaleString()}원`,
        imageUrl: albaFormDetailData.imageUrls[0] || "/logo.png",
        buttonText: "채용공고 보기",
      }
    : undefined;

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container flex min-h-screen flex-col px-4 lg:px-0">
      {/* 카카오 공유 스트립트 */}
      <Script
        src={`https://developers.kakao.com/sdk/js/kakao.min.js?v=${new Date().getTime()}`}
        strategy="afterInteractive"
        onLoad={() => {
          const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
          if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoKey);
          }
        }}
      />

      {/* 사진영역 */}
      {albaFormDetailData && (
        <FormImage
          imageUrls={albaFormDetailData.imageUrls}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      <div className="mt-4 flex flex-col justify-between lg:mt-20 lg:flex-row">
        {/* 왼쪽 영역 */}
        <div className="w-full space-y-10 lg:w-[770px]">
          {albaFormDetailData && (
            <>
              <FormHeader albaFormDetailData={albaFormDetailData} />
              <FormDetails albaFormDetailData={albaFormDetailData} />
            </>
          )}
          {/* 카카오맵 스크립트 */}
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="afterInteractive" />

          {/* 지도 영역 */}
          <div className="h-[280px] lg:h-[320px]">
            {error && <div className="text-primary-orange-300">Map load error: {String(error)}</div>}
            {!loading && !error && albaFormDetailData && (
              <Map center={coords} style={{ width: "100%", height: "100%", zIndex: 0 }} level={3}>
                <MapMarker position={coords}>
                  <div className="whitespace-nowrap p-2 text-center">
                    <p className="">{albaFormDetailData.storeName}</p>
                  </div>
                </MapMarker>
              </Map>
            )}
          </div>
        </div>

        {/* 모집공고 내용 */}
        <div className="flex w-full flex-col space-y-12 lg:w-[640px]">
          {albaFormDetailData && <RecruitInformation albaFormDetailData={albaFormDetailData} formId={formIdState} />}
        </div>
      </div>
      {/* 지원 현황 */}
      {isOwner && isAuthor && <ApplyStatus formId={formIdState} />}

      <div className="fixed right-10 top-1/2 flex w-12 flex-col items-end gap-5">
        {user && !isOwner && <ScrapBtn formId={formIdState} />}
        <ExpandedFloatingBtn icon={<IoShareSocialSharp />} variant="orange" shareContent={shareContent} />
      </div>
    </div>
  );
}
