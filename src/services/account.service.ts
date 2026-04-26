import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

export const accountService = {
  async findAll() {
    const { data } = await clientAxios.get(API_ROUTES.ACCOUNTS);
    return data;
  },

  async findById(id: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ACCOUNTS}/${id}`);
    return data;
  },

  async getStats(id: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ACCOUNTS}/${id}/stats`);
    return data;
  },
};
