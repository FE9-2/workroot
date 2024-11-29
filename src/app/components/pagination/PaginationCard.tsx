const PaginationCard = ({ imageCount, selectedId }: { imageCount: number; selectedId: number }) => {
  const activeStyle = "text-gray-50 font-semibold text-xs leading-[20px]";
  const defaultStyle = "text-gray-100 font-medium text-xs leading-[18px]";
  return (
    <div className="flex items-center gap-1 rounded-[100px] bg-[#000] px-[10px] py-[2px] opacity-20 lg:gap-2 lg:px-4 lg:py-2 lg:text-lg lg:leading-[26px]">
      <span className={activeStyle}>{selectedId + 1}</span>
      <span className={defaultStyle}>/</span>
      <span className={defaultStyle}>{imageCount}</span>
    </div>
  );
};

export default PaginationCard;
