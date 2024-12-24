import Image from "next/image";
import Indicator from "@/app/components/pagination/Indicator";
import { isValidS3Url } from "@/utils/checkS3Url";

interface FormImageProps {
  imageUrls: string[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function FormImage({ imageUrls, currentPage, onPageChange }: FormImageProps) {
  return (
    <div className="relative flex h-[300px] justify-center lg:h-[460px]">
      {/* 이미지 표시 */}
      {imageUrls?.map((imageUrl, index) => (
        <div
          key={imageUrl}
          className={`absolute h-full w-full transition-opacity duration-300 ${
            index === currentPage ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={imageUrl}
            alt={`알바 이미지 ${index + 1}`}
            className="h-full w-full rounded-lg object-cover"
            priority={index === 0}
            fill
          />
        </div>
      ))}

      {/* 인디케이터 */}
      {imageUrls.filter((url) => isValidS3Url(url)).length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Indicator imageCount={imageUrls?.length ?? 0} currentPage={currentPage} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
