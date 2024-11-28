import { FiDownload } from "react-icons/fi";
import BaseFileInput from "./BaseFileInput";
import { BaseFileInputProps } from "@/types/textInput";

const DownloadInput = (props: BaseFileInputProps) => {
  return (
    <BaseFileInput
      {...props}
      variant="download"
      icon={<FiDownload className="size-[14px] text-black-400 lg:size-[18px]" />}
    />
  );
};

export default DownloadInput;
