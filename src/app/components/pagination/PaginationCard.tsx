const PaginationCard = ({ imageCount, selectedId }: { imageCount: number; selectedId: number }) => {
  const selectedStyle = "text-gray-50 font-semibold text-xs leading-[20px]";
  const notSelectedStyle = "text-gray-100 font-medium text-xs leading-[18px]";
  return (
    <div className="flex items-center gap-1 rounded-[100px] bg-[#000] px-[10px] py-[2px] opacity-20 lg:gap-2 lg:px-4 lg:py-2 lg:text-lg lg:leading-[26px]">
      <span className={selectedStyle}>{selectedId + 1}</span>
      <span className={notSelectedStyle}>/</span>
      <span className={notSelectedStyle}>{imageCount}</span>
    </div>
  );
};

export default PaginationCard;
