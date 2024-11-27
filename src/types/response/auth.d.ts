import { UserResponse } from "./user";

// 로그인 응답
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}
