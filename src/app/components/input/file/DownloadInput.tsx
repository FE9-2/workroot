import BaseFileInput from "./BaseFileInput";
import { BaseFileInputProps } from "@/types/textInput";
import Image from "next/image";

const DownloadInput = (props: BaseFileInputProps) => {
  return (
    <BaseFileInput
      {...props}
      variant="download"
      icon={
        <div className="size-6 lg:size-8">
          <Image
            src={"/icons/download/download-sm.svg"}
            alt="업로드"
            height={24}
            width={24}
            className="h-full w-full"
          />
        </div>
      }
    />
  );
};

export default DownloadInput;
