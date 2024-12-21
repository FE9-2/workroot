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
  user: OauthSignupUser;
  refreshToken: string;
  accessToken: string;
}

export interface OauthAppResponse {
  createdAt: string;
  updatedAt: string;
  appKey: string;
  provider: string;
  teamId: string;
  id: string;
}
