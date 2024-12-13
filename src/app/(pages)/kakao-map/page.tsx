"use client";

import React, { useState, useCallback } from "react";
import Script from "next/script";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface Coords {
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: { address: string; zonecode: string; [key: string]: any }) => void;
      }) => { open: () => void };
    };
  }
}

const KakaoMapPage = () => {
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<Coords>({ lat: 37.5665, lng: 126.978 });

  // useKakaoLoader를 사용해 Kakao Maps 스크립트 로드
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY as string,
    libraries: ["services"], // 추가 옵션으로 services 라이브러리를 로드
  });

  // 주소 검색 함수 (주소 → 좌표 변환)
  const searchAddress = useCallback(() => {
    if (!address) return;
    if (typeof window === "undefined" || !window.kakao?.maps?.services) {
      console.error("Kakao Maps Services not available yet");
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
        const { x, y } = result[0]; // x: 경도, y: 위도
        setCoords({ lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        alert("주소를 찾을 수 없습니다. 정확한 주소를 입력해주세요.");
      }
    });
  }, [address]);

  // 우편번호 검색 버튼 클릭 시 팝업 열기
  const handleOpenPostcode = useCallback(() => {
    if (typeof window === "undefined" || !window.daum) return;

    new window.daum.Postcode({
      oncomplete: (data) => {
        setAddress(data.address);
      },
    }).open();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Daum Postcode 스크립트 로드 */}
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" strategy="afterInteractive" />

      <h1 className="mb-4 text-2xl font-bold">우편번호 검색으로 주소 입력 & 지도 표시 (useKakaoLoader)</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 border p-2"
        />
        <button onClick={handleOpenPostcode} className="rounded bg-green-500 p-2 text-white hover:bg-green-600">
          우편번호 찾기
        </button>
        <button
          onClick={searchAddress}
          disabled={loading || !!error}
          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          검색
        </button>
      </div>

      <div className="h-96 w-full border">
        {error && <div className="text-red-500">Map load error: {String(error)}</div>}
        {/* {loading && !error && (
          <div className="flex h-full items-center justify-center text-gray-500">Kakao Maps 로딩 중...</div>
        )} */}
        {!loading && !error && (
          <Map center={coords} style={{ width: "100%", height: "100%" }} level={3}>
            <MapMarker position={coords}>현재 위치</MapMarker>
          </Map>
        )}
      </div>

      {coords && !loading && !error && (
        <div className="mt-4 text-lg text-gray-700">
          <p>위도: {coords.lat}</p>
          <p>경도: {coords.lng}</p>
        </div>
      )}
    </div>
  );
};

export default KakaoMapPage;
