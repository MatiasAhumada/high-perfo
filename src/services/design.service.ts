import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type { UpdateDesignConfigDto } from "@/types/design-config.types";

export const designService = {
  async findByAccount(accountId: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ACCOUNTS}/${accountId}/design`);
    return data;
  },

  async update(accountId: string, dto: UpdateDesignConfigDto) {
    const { data } = await clientAxios.patch(`${API_ROUTES.ACCOUNTS}/${accountId}/design`, dto);
    return data;
  },
};
