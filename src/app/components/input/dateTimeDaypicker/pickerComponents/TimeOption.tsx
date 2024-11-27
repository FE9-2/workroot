// 드롭다운 개발 전까지 임시 jsx
const TimeItem = ({ time, onSelect }: { time: string; onSelect: (time: string) => void }) => {
  return (
    <li
      key={time}
      value={time}
      className="cursor-pointer px-4 py-2 text-sm font-normal leading-[26px] hover:bg-gray-50 lg:text-base lg:leading-8"
      onClick={() => onSelect(time)}
    >
      {time}
    </li>
  );
};

const TimeOption = ({
  className,
  handleTimeSelect,
}: {
  className?: string;
  handleTimeSelect: (time: string) => void;
}) => {
  const timeOption = Array.from({ length: 24 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });
  const wrapperStyle = "mb-5 flex h-[200px] w-full flex-col gap-1 overflow-x-hidden rounded-lg border p-1";

  return (
    <div className={`${wrapperStyle} ${className}`}>
      <div className={`scrollbar-custom`}>
        <ul className="flex flex-col">
          {timeOption.map((time, index) => (
            <TimeItem key={index} time={time} onSelect={handleTimeSelect} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeOption;
