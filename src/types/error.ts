import { AxiosError } from "axios";
import { ZodError } from "zod";

// 인증 에러 타입 추가
export class AuthenticationError extends Error {
  constructor(message: string = "인증이 필요합니다.") {
    super(message);
    this.name = "AuthenticationError";
  }
}

// AppError 타입 확장
export type AppError = Error | AxiosError | ZodError | AggregateError | AuthenticationError;
