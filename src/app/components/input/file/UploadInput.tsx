import BaseFileInput from "./BaseFileInput";
import { BaseFileInputProps } from "@/types/textInput";
import Image from "next/image";
import { useState } from "react";
/*
 * @param name: string; - 필수값
 * @param variant: "upload" | "download"; - 필수값
 * @param placeholder: string; - 필수값
 * @param size?: string;
 * @param file?: File | null;
 * @param onFileAction?: (file: File | null) => void;
 * @param icon?: React.ReactNode;
 * @param actionIcon?: React.ReactNode;
 * @param isImage?: boolean;
 */
const UploadInput = ({ onChange, ...props }: BaseFileInputProps) => {
  // const { file, handleChangeFile, handleDeleteFile } = useFile();
  const [file, setFile] = useState<File | null>(null);

  const handleChangeFile = (newFile: File | null) => {
    setFile(newFile);

    // react-hook-form의 onChange 호출
    if (onChange) {
      const event = {
        target: {
          files: newFile ? [newFile] : [],
        },
      } as unknown as Event;
      onChange(event);
    }
  };
  const handleDeleteFile = () => {
    setFile(null);
    // react-hook-form의 onChange 호출
    if (onChange) {
      const event = {
        target: {
          files: [],
        },
      } as unknown as Event;
      onChange(event);
    }
  };
  return (
    <BaseFileInput
      {...props}
      file={file}
      placeholder="파일 업로드하기"
      onFileAction={handleChangeFile}
      actionIcon={
        file ? (
          <button type="button" onClick={handleDeleteFile} className="size-6 lg:size-8">
            <Image src={"/icons/x/x-circle-md.svg"} alt="삭제" height={24} width={24} className="h-full w-full" />
          </button>
        ) : (
          <div className="size-6 lg:size-8">
            <Image src={"/icons/upload/upload-sm.svg"} alt="업로드" height={24} width={24} className="h-full w-full" />
          </div>
        )
      }
    />
  );
};

export default UploadInput;
