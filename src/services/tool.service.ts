import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";

interface CreateToolData {
  toolKey: string;
  data?: Record<string, unknown>;
}

interface UpdateToolData {
  completed?: boolean;
  data?: Record<string, unknown>;
}

export const toolService = {
  async findByRoutine(routineId: string) {
    const { data } = await clientAxios.get(`${API_ROUTES.ROUTINES}/${routineId}/tools`);
    return data;
  },

  async create(routineId: string, dto: CreateToolData) {
    const { data } = await clientAxios.post(`${API_ROUTES.ROUTINES}/${routineId}/tools`, dto);
    return data;
  },

  async update(toolId: string, dto: UpdateToolData) {
    const { data } = await clientAxios.patch(`${API_ROUTES.TOOLS}/${toolId}`, dto);
    return data;
  },
};
