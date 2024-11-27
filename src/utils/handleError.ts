import { AxiosError } from "axios";
import { ZodError } from "zod";
import { AuthenticationError } from "../types/error";

type AppError = Error | AxiosError | ZodError | AggregateError | AuthenticationError;

export function handleError(error: AppError) {
  // ZodError 처리
  if (error instanceof ZodError) {
    console.error("Validation Error:", error.errors);
    return;
  }

  // AxiosError 처리
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.error("Authentication Error:", error.response?.data || error.message);
    } else {
      console.error("API Error:", error.response?.data || error.message);
    }
    return;
  }

  // AggregateError 처리
  if (error instanceof AggregateError) {
    console.error("Multiple Errors:", error.errors);
    return;
  }

  // AuthenticationError 처리
  if (error instanceof AuthenticationError) {
    console.error("Authentication Error:", error.message);
    return;
  }

  // 기본 처리 (예상치 못한 에러)
  console.error("General Error:", error.message || "An unknown error occurred.");
}
