const InfoItem = ({ applyCount, scrapCount, dDay }: { applyCount: number; scrapCount: number; dDay: string }) => {
  return (
    <div className="text-grayscale-700 m-1 mt-4 flex h-[50px] items-center justify-between rounded-2xl border border-grayscale-100 text-sm lg:text-base">
      <div className="flex flex-1 items-center justify-center">
        <span className="font-medium">지원자 {applyCount}명</span>
      </div>
      <div className="h-5 w-[1px] bg-grayscale-200/50" />
      <div className="flex flex-1 items-center justify-center">
        <span className="font-medium">스크랩 {scrapCount}명</span>
      </div>
      <div className="h-5 w-[1px] bg-grayscale-200/50" />
      <div className="flex flex-1 items-center justify-center">
        <span className="font-medium">{dDay}</span>
      </div>
    </div>
  );
};

export default InfoItem;
