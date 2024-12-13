// 이미지 업로드 api

import { useUpdateProfile } from "@/hooks/queries/user/me/useUpdateProfile";
import toast from "react-hot-toast";
import renameFile from "./renameFile";

const uploadImages = async (files: File[]) => {
  const { uploadImageMutation } = useUpdateProfile();

  const uploadedUrls: string[] = [];

  // 전체 파일 배열을 순회하면서 용량 검사 & 이름 변경 후 업로드 로직 진행
  for (const file of files) {
    // 파일 크기 체크
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error(`5MB 이상의 파일은 업로드할 수 없습니다.`);
      continue;
    }

    try {
      const uploadResponse = await uploadImageMutation.mutateAsync(renameFile(file));
      if (uploadResponse?.url) {
        uploadedUrls.push(uploadResponse.url);
      }
    } catch (uploadError) {
      console.error(`파일 ${file.name} 업로드 실패:`, uploadError);
    }
  }
  return uploadedUrls;
};
export default uploadImages;
