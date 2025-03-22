import { LoginKey } from '@/src/queries/Auth/keys';

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  [LoginKey.USERNAME]: string;
  [LoginKey.PASSWORD]: string;
}
export interface RefreshTokenPayload {
  token: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayload {
  username: string;
}

export interface ResetPasswordPayload {
  token: string,
  newPassword: string,
  confirmPassword: string;
}