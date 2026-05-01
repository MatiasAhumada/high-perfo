import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type {
  LoginDto,
  RegisterDto,
  ChangePasswordDto,
} from "@/types/auth.types";

export const authService = {
  async login(credentials: LoginDto) {
    const { data: responseData } = await clientAxios.post(
      API_ROUTES.AUTH.LOGIN,
      credentials,
    );
    return responseData;
  },

  async register(payload: RegisterDto) {
    const { data } = await clientAxios.post(API_ROUTES.AUTH.REGISTER, payload);
    return data;
  },

  async getSession() {
    const { data } = await clientAxios.get(API_ROUTES.AUTH.SESSION);
    return data;
  },

  async changePassword(payload: ChangePasswordDto) {
    const { data } = await clientAxios.patch(API_ROUTES.AUTH.PASSWORD, payload);
    return data;
  },

  async logout() {
    const { data } = await clientAxios.post(API_ROUTES.AUTH.LOGOUT);
    return data;
  },
};
