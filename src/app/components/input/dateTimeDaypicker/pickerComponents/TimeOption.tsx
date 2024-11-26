// 드롭다운 개발 전까지 임시 jsx
const TimeItem = ({ time, onSelect }: { time: string; onSelect: (time: string) => void }) => {
  return (
    <button type="button" value={time} onClick={() => onSelect(time)}>
      {time}
    </button>
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

  return (
    <div
      className={`mb-5 flex h-[200px] w-full flex-col gap-1 overflow-scroll overflow-x-hidden rounded-lg border p-2 ${className}`}
    >
      {timeOption.map((time, index) => (
        <TimeItem key={index} time={time} onSelect={handleTimeSelect} />
      ))}
    </div>
  );
};

export default TimeOption;
