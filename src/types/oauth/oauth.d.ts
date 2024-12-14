export interface OauthSignupUser {
  location?: string;
  phoneNumber?: string;
  storePhoneNumber?: string;
  storeName?: string;
  role: string;
  nickname?: string;
  name: string;
  redirectUri?: string;
  token: string;
}

export interface OauthLoginUser {
  redirectUri: string;
  token: string;
}

export interface OauthResponse {
  use: KakaoSignupUser;
  refreshToken: string;
  accessToken: string;
}
