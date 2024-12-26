"use client";

import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Indicator from "@/app/components/pagination/Indicator";

interface ImageViewerModalProps {
  imageUrls: string[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
}

export default function ImageViewerModal({ imageUrls, currentPage, onPageChange, onClose }: ImageViewerModalProps) {
  return (
    <div className="bg-black/30 fixed inset-x-0 bottom-0 top-[12px] z-[100] flex items-center justify-center">
      <div className="relative h-[85vh] w-[90vw]">
        <button
          onClick={onClose}
          className="bg-black/50 hover:bg-black/70 absolute right-2 top-2 z-[101] rounded-full p-2.5 text-white transition-colors"
          aria-label="닫기"
        >
          <IoClose className="text-2xl" />
        </button>

        {imageUrls?.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className={`absolute h-full w-full transition-opacity duration-300 ${
              index === currentPage ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={imageUrl}
              alt={`이미지 ${index + 1}`}
              className="h-full w-full rounded-lg object-contain"
              fill
              sizes="90vw"
              priority={index === currentPage}
            />
          </div>
        ))}

        {imageUrls.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Indicator imageCount={imageUrls.length} currentPage={currentPage} onPageChange={onPageChange} />
          </div>
        )}
      </div>
    </div>
  );
}
