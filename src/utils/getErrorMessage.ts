import { AxiosError } from "axios";
import { ZodError } from "zod";
import { AuthenticationError } from "../types/error"; // 인증 에러 추가

export function getErrorMessage(error: Error): string {
  if (error instanceof ZodError) {
    return "잘못된 입력입니다. 데이터를 확인해주세요.";
  }
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return "인증되지 않았습니다. 로그인 해주세요.";
    }
    if (error.response?.status === 403) {
      return "이 리소스에 접근할 권한이 없습니다.";
    }
    return error.response?.data?.message || "데이터를 가져오지 못했습니다.";
  }
  if (error instanceof AuthenticationError) {
    return error.message;
  }
  return error.message || "알 수 없는 에러가 발생했습니다.";
}
