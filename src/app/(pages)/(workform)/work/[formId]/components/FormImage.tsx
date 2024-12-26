"use client";

import Image from "next/image";
import Indicator from "@/app/components/pagination/Indicator";
import { isValidS3Url } from "@/utils/checkS3Url";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";

interface FormImageProps {
  imageUrls: string[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function FormImage({ imageUrls, currentPage, onPageChange }: FormImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const slides = imageUrls.map((url) => ({
    src: url,
  }));

  return (
    <>
      <div className="relative flex h-[300px] justify-center lg:h-[460px]">
        {/* 이미지 표시 */}
        {imageUrls?.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className={`absolute h-full w-full cursor-zoom-in transition-opacity duration-300 ${
              index === currentPage ? "opacity-100" : "opacity-0"
            }`}
            onClick={handleImageClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleImageClick();
              }
            }}
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

      {/* Lightbox */}
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentPage}
        plugins={[Zoom, Counter]}
        counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        on={{
          view: ({ index }) => onPageChange(index),
        }}
      />
    </>
  );
}
