// 상세폼 이미지 캐러셀 하단 페이지네이션 컴포넌트
import { GoDotFill } from "react-icons/go";

const Indicator = ({ imageCount, selectedId }: { imageCount: number; selectedId: number }) => {
  const activeStyle = "size-4 text-gray-300 opacity-60";
  const defaultStyle = "size-3 text-gray-50 opacity-60";
  // 이미지 개수 만큼 동적으로 생성
  const indicators = Array(imageCount)
    .fill(null)
    .map((_, index) => <GoDotFill key={index} className={selectedId === index ? activeStyle : defaultStyle} />);
  return <div className="flex items-center justify-between gap-2">{indicators}</div>;
};

export default Indicator;
