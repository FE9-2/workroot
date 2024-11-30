import Button from "@/app/components/button/default/Button";

const ApplyHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full items-center justify-between py-5">
      <h1 className="text-xl font-semibold leading-5 text-black-500 lg:text-[32px] lg:leading-[46px]">{title}</h1>
      <Button className="h-10 text-grayscale-50" color="gray" width="xs">
        작성 취소
      </Button>
    </div>
  );
};

export default ApplyHeader;
