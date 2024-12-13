import { useUpdateProfile } from "@/hooks/queries/user/me/useUpdateProfile";
import renameFile from "@/utils/renameFile";
import toast from "react-hot-toast";

const useUploadImages = () => {
  const { uploadImageMutation } = useUpdateProfile();

  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];

    for (const file of files) {
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

  return { uploadImages };
};

export default useUploadImages;
