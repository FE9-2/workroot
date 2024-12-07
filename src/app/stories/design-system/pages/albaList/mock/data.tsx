import { FormListType } from "@/types/response/form";

const titles = [
  "편의점 야간 알바 구합니다",
  "주말 카페 알바 모집",
  "피자집 배달 직원 구함",
  "학원 사무보조 알바",
  "서빙 알바 급구",
  "물류센터 상하차",
  "마트 진열 알바",
  "영화관 매점 알바",
  "호텔 룸메이드 모집",
  "주차관리 알바",
];

const images = [
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523242942815-1ba8fc07f592?q=80&w=2070&auto=format&fit=crop",
];

// 단일 알바 데이터 생성
function generateMockForm(id: number): FormListType {
  const now = new Date();
  const startDate = new Date();
  const endDate = new Date();

  startDate.setDate(now.getDate() + Math.floor(Math.random() * 7));
  endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30) + 7);

  return {
    id,
    title: titles[Math.floor(Math.random() * titles.length)],
    applyCount: Math.floor(Math.random() * 50),
    scrapCount: Math.floor(Math.random() * 30),
    recruitmentEndDate: endDate,
    recruitmentStartDate: startDate,
    imageUrls: [images[Math.floor(Math.random() * images.length)]],
    isPublic: Math.random() > 0.2,
    createdAt: now,
    updatedAt: now,
  } as FormListType;
}

// 전체 데이터 풀 생성 (100개)
const TOTAL_ITEMS = 100;
const mockDataPool = Array.from({ length: TOTAL_ITEMS }, (_, index) => generateMockForm(index + 1));

// 무한 스크롤용 데이터 가져오기
export function fetchMockData(page: number, limit: number = 10) {
  const start = (page - 1) * limit;
  const end = start + limit;
  const hasMore = end < TOTAL_ITEMS;

  return {
    items: mockDataPool.slice(start, end),
    hasMore,
    nextPage: hasMore ? page + 1 : null,
  };
}

// 초기 데이터 가져오기
export function getInitialMockData(limit: number = 10) {
  return fetchMockData(1, limit);
}
