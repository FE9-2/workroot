import { MouseEvent, useState } from "react";

export const useFile = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChangeFile = (newFile: File | null) => {
    setFile(newFile);
  };

  const handleDeleteFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFile(null);
  };
  return {
    file,
    handleChangeFile,
    handleDeleteFile,
  };
};
