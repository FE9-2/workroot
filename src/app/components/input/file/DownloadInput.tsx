import { FiDownload } from "react-icons/fi";
import BaseFileInput from "./BaseFileInput";
import { BaseFileInputProps } from "@/types/textInput";

const DownloadInput = (props: BaseFileInputProps) => {
  return (
    <BaseFileInput {...props} variant="download" icon={<FiDownload className="size-4 text-black-400 lg:size-6" />} />
  );
};

export default DownloadInput;
