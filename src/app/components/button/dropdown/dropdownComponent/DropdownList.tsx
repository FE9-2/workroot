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
        "bg-grayscale-50 flex w-full cursor-pointer px-[10px] py-2 text-xs font-normal leading-[18px] text-black-100 hover:bg-primary-orange-50 lg:text-lg lg:leading-[26px]",
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
      className="border-grayscale-100 bg-grayscale-50 absolute mt-[6px] rounded border pr-[2px] pt-1"
    >
      <ul className={`flex flex-col overflow-hidden ${wrapperStyle} scrollbar-custom`}>
        {list.map((item) => (
          <DropdownItem key={item} item={item} onSelect={onSelect} itemStyle={itemStyle} />
        ))}
      </ul>
    </div>
  );
};

export default DropdownList;
