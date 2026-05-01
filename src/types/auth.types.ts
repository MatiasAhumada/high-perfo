import { UserResponse } from "./user.types";

export type LoginDto = { email: string; password: string };
export type RegisterDto = {
  email: string;
  password: string;
  name: string;
  planId: string;
  accountName: string;
  isOrganization: boolean;
};
export type AuthResponse = { user: UserResponse; accessToken: string };
export type ChangePasswordDto = {
  currentPassword: string;
  newPassword: string;
};
