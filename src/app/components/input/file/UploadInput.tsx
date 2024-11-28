import { HiUpload } from "react-icons/hi";
import { IoCloseCircleOutline } from "react-icons/io5";
import BaseFileInput from "./BaseFileInput";
import { BaseFileInputProps } from "@/types/textInput";
import { useFile } from "@/hooks/useFile";

const UploadInput = (props: BaseFileInputProps) => {
  const { file, handleChangeFile, handleDeleteFile } = useFile();

  return (
    <BaseFileInput
      {...props}
      file={file}
      placeholder="파일 업로드하기"
      onFileAction={handleChangeFile}
      actionIcon={
        file ? (
          <button type="button" onClick={handleDeleteFile}>
            <IoCloseCircleOutline className="size-[14px] text-gray-400 lg:size-[18px]" />
          </button>
        ) : (
          <HiUpload className="size-[14px] text-black-400 lg:size-[18px]" />
        )
      }
    />
  );
};

export default UploadInput;
