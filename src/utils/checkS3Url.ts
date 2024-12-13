import { S3_URL } from "@/constants/config";

// S3 URL 체크 함수
export const isValidS3Url = (url: string) => {
  return url.startsWith(S3_URL);
};
