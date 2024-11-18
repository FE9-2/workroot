export interface User {
  id: string;
  email: string;
  nickname: string;
  image: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
