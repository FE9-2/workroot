import { FiDownload } from "react-icons/fi";
import BaseFileInput from "./BaseFileInput";
import { BaseFileInputProps } from "@/types/textInput";

const DownloadInput = (props: BaseFileInputProps) => {
  return (
    <BaseFileInput {...props} variant="download" icon={<FiDownload className="size-6 text-black-400 lg:size-9" />} />
  );
};

export default DownloadInput;
