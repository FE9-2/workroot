import Button from "@/app/components/button/default/Button";

const ApplyHeader = ({ title, onCancel }: { title: string; onCancel: () => void }) => {
  return (
    <div className="flex w-full items-center justify-between pb-5">
      <h1 className="text-xl font-semibold leading-5 text-black-500 lg:text-[32px] lg:leading-[46px]">{title}</h1>
      <Button className="h-10 min-w-[80px] text-grayscale-50" color="gray" width="xs" onClick={onCancel}>
        작성 취소
      </Button>
    </div>
  );
};

export default ApplyHeader;
