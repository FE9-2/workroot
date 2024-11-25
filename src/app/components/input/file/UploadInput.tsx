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
            <IoCloseCircleOutline className="size-6 text-gray-400 lg:size-9" />
          </button>
        ) : (
          <HiUpload className="size-6 text-black-400 lg:size-9" />
        )
      }
    />
  );
};

export default UploadInput;
