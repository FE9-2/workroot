export const oauthProviders = {
  GOOGLE: "google",
  KAKAO: "kakao",
} as const;

export type OAuthProvider = (typeof oauthProviders)[keyof typeof oauthProviders];
