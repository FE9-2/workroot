import { cn } from "@/lib/tailwindUtil";

const DropdownItem = ({
  item,
  onSelect,
  itemStyle,
}: {
  item: string;
  onSelect: (item: string) => void;
  itemStyle?: string;
}) => {
  return (
    <li
      value={item}
      onClick={() => onSelect(item)}
      className={cn(
        "flex w-full cursor-pointer bg-gray-50 px-[10px] py-2 text-xs font-normal leading-[18px] text-black-100 hover:bg-primary-orange-50 lg:text-lg lg:leading-[26px]",
        itemStyle
      )}
    >
      {item}
    </li>
  );
};
const DropdownList = ({
  list,
  onSelect,
  wrapperStyle,
  itemStyle,
}: {
  list: string[];
  onSelect: (item: string) => void;
  wrapperStyle?: string;
  itemStyle?: string;
}) => {
  return (
    <div
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="options-menu"
      className="mt-[6px] rounded border border-gray-100 bg-gray-50 pr-[2px] pt-1"
    >
      <ul className={`flex w-full flex-col overflow-hidden lg:w-[126px] ${wrapperStyle} scrollbar-custom`}>
        {list.map((item) => (
          <DropdownItem key={item} item={item} onSelect={onSelect} itemStyle={itemStyle} />
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
