import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

interface DashboardStatsParams {
  accountId: string;
}

export const statsService = {
  async getDashboardStats(params: DashboardStatsParams) {
    const { data } = await clientAxios.get(API_ROUTES.STATS, { params });
    return data;
  },
};
