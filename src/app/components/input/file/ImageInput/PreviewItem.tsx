import { ImageInputType } from "@/types/addform";
import Image from "next/image";

const PreviewItem = ({
  image,
  handleDeleteImage,
  placeholder,
}: {
  image: ImageInputType;
  handleDeleteImage: (url: string) => void;
  placeholder: boolean;
}) => {
  const { url } = image;
  const size = placeholder ? "size-[160px] lg:size-[240px]" : "size-20 lg:size-[116px]";
  return (
    <div className={`relative ${size}`}>
      {/* 이미지 미리보기 */}
      <Image src={url} alt="미리보기" fill className="overflow-hidden rounded-lg object-cover" />
      <div
        onClick={() => handleDeleteImage(url)}
        className="absolute -right-2 -top-2 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full lg:-right-3 lg:-top-3 lg:size-9"
      >
        <Image src={"/icons/x/x-circle-md.svg"} alt="삭제" height={24} width={24} className="h-full w-full" />
      </div>
    </div>
  );
};

export default PreviewItem;
