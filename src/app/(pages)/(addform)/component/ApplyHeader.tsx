import Button from "@/app/components/button/default/Button";

const ApplyHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between px-6 py-5">
      <h1 className="text-xl font-semibold leading-5 text-black-500">{title}</h1>
      <Button className="text-grayscale-50 h-10" color="gray" width="xs">
        작성 취소
      </Button>
    </div>
  );
};

export default ApplyHeader;
